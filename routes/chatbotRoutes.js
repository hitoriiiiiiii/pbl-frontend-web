// Route to handle chatbot requests
app.post("/chat", (req, res) => {
    const userMessage = req.body.message;  // Get the user message
  
    if (!userMessage) {
      console.log("No message provided");
      return res.status(400).json({ error: "No message provided" });
    }
  
    // Spawn a Python process to run the chatbot script
    const pythonProcess = spawn('python', ['assets/styles/chatbot.py', userMessage]);
  
    // Handle the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
      const botResponse = data.toString(); // Get response from Python script
      console.log("Bot response: ", botResponse);  // Log the bot response
      res.json({ response: botResponse }); // Send response to frontend
    });
  
    // Handle errors from the Python script
    pythonProcess.stderr.on('data', (error) => {
      console.error(`Error in Python script: ${error.toString()}`);
      res.status(500).json({ error: "Internal server error in Python script" });
    });
  
    // Handle Python process exit
    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.log(`Python script exited with code ${code}`);
        res.status(500).json({ error: "Python script error" });
      }
    });
  });
  