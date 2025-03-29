import React from "react";
import "./PortfolioTransaction.css";

const PortfolioTransaction = () => {
  const transactions = [
    {
      id: 1,
      from: "Alice",
      to: "Amazon Stocks",
      amount: 5000,
      date: "2025-03-28",
      message: "Purchased 10 shares",
    },
    {
      id: 2,
      from: "Bob",
      to: "Google Stocks",
      amount: 8000,
      date: "2025-03-27",
      message: "Bought for portfolio diversification",
    },
    {
      id: 3,
      from: "Portfolio Fund",
      to: "Tesla Stocks",
      amount: 12000,
      date: "2025-03-25",
      message: "High-growth investment",
    },
  ];

  return (
    <div className="portfolio-transaction">
      <h1>Transaction History</h1>
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount ($)</th>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.from}</td>
                <td>{txn.to}</td>
                <td>{txn.amount.toLocaleString()}</td>
                <td>{txn.date}</td>
                <td>{txn.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTransaction;
