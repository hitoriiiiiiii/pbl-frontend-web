import os
import threading
from time import sleep
import pyttsx3
import speech_recognition as sr
import tkinter as tk
from tkinter import scrolledtext
import yfinance as yf
import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd
from flask import Flask
from dotenv import load_dotenv
import matplotlib.pyplot as plt

# --- Load Environment Variables ---
load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")

if not gemini_api_key:
    raise ValueError("Error: GEMINI_API_KEY is not set in the environment.")

# --- Initialization ---
engine = pyttsx3.init()
engine.setProperty('rate', 150)

root = tk.Tk()
root.title("Market Fish Voice Assistant")
root.geometry("500x500")

conversation_area = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=50, height=15, font="Arial")
conversation_area.pack(padx=10, pady=10)

user_input_box = tk.Entry(root, font=("Arial Black", 14), width=50)
user_input_box.pack(padx=10, pady=5)

marketfish = Flask(__name__)

# --- Helper Functions ---
def speak(text):
    """Speak the given text."""
    engine.say(text)
    engine.runAndWait()

def update_conversation_area(text):
    """Update the conversation area with new text."""
    conversation_area.insert(tk.END, text + "\n")
    conversation_area.yview(tk.END)

def input_instruction():
    """Capture audio input and convert to text."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            query = recognizer.recognize_google(audio, language='en-in').lower()
            return query
        except sr.WaitTimeoutError:
            return "none"
        except sr.UnknownValueError:
            return "Sorry, I didn't catch that."
        except Exception as e:
            return f"Error: {e}"

def current_stock_price(symbol):
    """Fetch historical stock data for a given symbol."""
    stock_data = yf.Ticker(symbol)
    hist = stock_data.history(period="60d")
    if hist.empty:
        return None
    hist.reset_index(inplace=True)
    df = pd.DataFrame()
    df['ds'] = pd.to_datetime(hist['Date'])
    df['y'] = hist['Close'].round(2)
    return df

def predict_stock_price(stock_symbol, time_range):
    """Predict future stock prices based on historical data."""
    stock_data = yf.Ticker(stock_symbol)
    hist = stock_data.history(period=time_range)

    if hist.empty:
        return None

    hist.reset_index(inplace=True)
    df = pd.DataFrame()
    df['ds'] = pd.to_datetime(hist['Date'])
    df['y'] = hist['Close'].round(2)

    # Linear regression for price prediction
    x = np.array(range(len(df))).reshape(-1, 1)
    y = df['y'].values
    model = LinearRegression()
    model.fit(x, y)

    future_x = np.array(range(len(df), len(df) + 10)).reshape(-1, 1)  # 10-day prediction
    future_y = model.predict(future_x)

    future_dates = pd.date_range(df['ds'].iloc[-1] + pd.Timedelta(days=1), periods=10)
    prediction_df = pd.DataFrame({'ds': future_dates, 'yhat': future_y})

    return prediction_df

def plot_results(current_df, predicted_df, symbol):
    """Plot historical and predicted stock prices with an explanation and investment suggestion."""
    # Plot the historical and predicted data
    plt.figure(figsize=(10, 6))
    plt.plot(current_df['ds'], current_df['y'], label='Historical Data', color='blue')
    plt.plot(predicted_df['ds'], predicted_df['yhat'], label='Predicted Prices', linestyle='--', color='orange')
    plt.fill_between(predicted_df['ds'], predicted_df['yhat'] - 5, predicted_df['yhat'] + 5, 
                     color='orange', alpha=0.2, label='Confidence Interval')

    plt.title(f"{symbol.upper()} Stock Price Forecast")
    plt.xlabel("Date")
    plt.ylabel("Price (USD)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

    # Add the explanation for the graph
    explanation = (
        f"The graph above shows the predicted stock prices for {symbol.upper()} "
        "based on the historical data of the past time period.\n\n"
        "The blue line represents the historical stock prices, while the orange dashed line "
        "shows the predicted future prices.\n\n"
        "The shaded area around the predicted line represents the confidence interval, "
        "indicating the range within which the actual future prices are likely to fall."
    )

    # Display the explanation in the conversation area
    update_conversation_area(explanation)
    speak(explanation)
    speak("Here is the stock price prediction graph. The blue line shows historical data, "
          "and the orange dashed line shows predicted prices with a confidence interval.")

    # --- Investment Suggestion Logic ---
    # Calculate if the price is expected to rise or fall based on the predicted data
    predicted_change = predicted_df['yhat'].iloc[-1] - predicted_df['yhat'].iloc[0]
    if predicted_change > 0:
        suggestion = f"The price of {symbol.upper()} is expected to rise in the next 10 days."
        invest_suggestion = "It might be a good time to invest in this stock."
    else:
        suggestion = f"The price of {symbol.upper()} is expected to fall in the next 10 days."
        invest_suggestion = "It might be a better idea to wait and watch before investing."

    # Provide the suggestion to the user
    update_conversation_area(f"{suggestion}\n{invest_suggestion}")
    speak(f"{suggestion} {invest_suggestion}")

# --- UI Handlers ---
def handle_stock_query():
    """Process stock-related user queries."""
    query = user_input_box.get().lower()
    parts = query.split()
    if len(parts) != 2:
        update_conversation_area("Please enter stock symbol and time range (e.g., AAPL 1mo).")
        return

    stock_symbol, time_range = parts
    if time_range == "current":
        stock_data = current_stock_price(stock_symbol)
        if stock_data is not None:
            price = stock_data['y'].iloc[-1]
            update_conversation_area(f"{stock_symbol.upper()} Current Price: ${price}")
            speak(f"{stock_symbol.upper()} is currently at {price} dollars.")
    elif time_range in ['1mo', '5d', '3mo', '6mo', '1y']:
        current_df = current_stock_price(stock_symbol)
        predicted_df = predict_stock_price(stock_symbol, time_range)
        if current_df is None or predicted_df is None:
            update_conversation_area(f"Could not fetch or predict data for {stock_symbol}.")
            speak("Sorry, I couldn't complete the prediction.")
            return

        # Show and plot results
        update_conversation_area(f"Predicted Prices for {stock_symbol.upper()}:\n{predicted_df}")
        plot_results(current_df, predicted_df, stock_symbol)
    else:
        update_conversation_area("Invalid time range! Use one of: 5d, 1mo, 3mo, 6mo, 1y.")
        speak("Invalid time range.")

def end_conversation():
    """End the conversation and exit the application."""
    update_conversation_area("Goodbye!")
    speak("Hope your query was solved correctly. Enjoy your day.")
    root.quit()

def handle_key_press(event=None):
    """Handle Enter key press for user input."""
    query = user_input_box.get().lower()
    if "bye" in query or "thank you" in query:
        end_conversation()
    elif "hi" in query or "hello" in query:
        start_conversation()
    else:
        handle_stock_query()

def start_conversation():
    """Initiate a conversation."""
    update_conversation_area("Hello! Market Fish here...")
    speak("How may I help you?")

# --- Flask Integration ---
def run_flask():
    marketfish.run(port=5000, debug=True, use_reloader=False)

# Start Flask in a separate thread
threading.Thread(target=run_flask, daemon=True).start()

# Bind Enter key to user input box
user_input_box.bind("<Return>", handle_key_press)

# Run the Tkinter event loop
root.mainloop()
