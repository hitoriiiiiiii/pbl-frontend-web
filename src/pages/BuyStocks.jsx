import React, { useState } from "react";
import "./BuyStock.css";
import { FaApple, FaCar, FaAmazon, FaGoogle, FaMicrosoft, FaFacebook, FaBitcoin, FaTwitter } from "react-icons/fa";
import { SiAdobe, SiSpotify } from "react-icons/si"; // Importing from the correct package

const BuyStocks = () => {
  const [stocks] = useState([
    { id: 1, name: "Apple Inc.", ticker: "AAPL", price: 145, icon: <FaApple /> },
    { id: 2, name: "Tesla Inc.", ticker: "TSLA", price: 680, icon: <FaCar /> },
    { id: 3, name: "Amazon.com Inc.", ticker: "AMZN", price: 3300, icon: <FaAmazon /> },
    { id: 4, name: "Google LLC", ticker: "GOOGL", price: 2800, icon: <FaGoogle /> },
    { id: 5, name: "Microsoft Corporation", ticker: "MSFT", price: 299, icon: <FaMicrosoft /> },
    { id: 6, name: "Facebook Inc.", ticker: "META", price: 340, icon: <FaFacebook /> },
    { id: 7, name: "Bitcoin", ticker: "BTC", price: 45000, icon: <FaBitcoin /> },
    { id: 8, name: "Twitter Inc.", ticker: "TWTR", price: 55, icon: <FaTwitter /> },
    { id: 9, name: "Adobe Systems", ticker: "ADBE", price: 600, icon: <SiAdobe /> }, // Correct import for Adobe
    { id: 10, name: "Spotify Technology", ticker: "SPOT", price: 200, icon: <SiSpotify /> }, // Correct import for Spotify
  ]);

  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
    setTotal(stock.price);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0;
    setQuantity(qty);
    setTotal(selectedStock ? qty * selectedStock.price : 0);
  };

  const handlePurchase = () => {
    if (selectedStock && quantity > 0) {
      alert(`You purchased ${quantity} shares of ${selectedStock.name} (${selectedStock.ticker}) for $${total}!`);
    } else {
      alert("Please select a stock and enter a valid quantity.");
    }
  };

  return (
    <div className="buy-stocks-container">
      <h1>Buy Stocks</h1>
      <div className="stocks-list">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className={`stock-card ${selectedStock?.id === stock.id ? "selected" : ""}`}
            onClick={() => handleStockSelect(stock)}
          >
            <div className="stock-icon">{stock.icon}</div>
            <h3>{stock.name}</h3>
            <p>{stock.ticker}</p>
            <p>Price: ${stock.price}</p>
          </div>
        ))}
      </div>
      <div className="purchase-form">
        <h2>{selectedStock ? `Buying: ${selectedStock.name}` : "Select a stock"}</h2>
        {selectedStock && (
          <>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </label>
            <p>Total: ${total}</p>
            <button onClick={handlePurchase} className="buy-button">
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyStocks;
