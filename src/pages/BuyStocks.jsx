import React, { useState } from "react";
import "./BuyStock.css"


const BuyStocks = () => {
  const [stocks] = useState([
    { id: 1, name: "Apple Inc.", ticker: "AAPL", price: 145 },
    { id: 2, name: "Tesla Inc.", ticker: "TSLA", price: 680 },
    { id: 3, name: "Amazon.com Inc.", ticker: "AMZN", price: 3300 },
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
      // Add backend call here to process purchase
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
            <button onClick={handlePurchase}>Buy Now</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyStocks;
