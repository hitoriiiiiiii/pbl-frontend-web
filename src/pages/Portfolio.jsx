import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Portfolio.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  // Mock data
  const investmentData = [
    { asset: "Apple Inc.", category: "Stock", investment: 5000, currentValue: 6500, roi: 30 },
    { asset: "Amazon", category: "Stock", investment: 3000, currentValue: 3300, roi: 10 },
    { asset: "Bitcoin", category: "Crypto", investment: 7000, currentValue: 6000, roi: -14 },
    { asset: "Ethereum", category: "Crypto", investment: 2000, currentValue: 2300, roi: 15 },
    { asset: "Gold ETF", category: "Commodity", investment: 3000, currentValue: 3200, roi: 6 },
  ];

  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? investmentData
      : investmentData.filter((item) => item.category === filter);

  const totalInvestment = filteredData.reduce((acc, curr) => acc + curr.investment, 0);
  const totalCurrentValue = filteredData.reduce((acc, curr) => acc + curr.currentValue, 0);
  const netROI = (((totalCurrentValue - totalInvestment) / totalInvestment) * 100).toFixed(2);

  // Pie chart data
  const chartData = {
    labels: filteredData.map((item) => item.asset),
    datasets: [
      {
        label: "Portfolio Distribution",
        data: filteredData.map((item) => item.currentValue),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#e91e63",
          "#9c27b0",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>Client's Portfolio</h1>
        <p>Analyze and optimize your investments with real-time data insights.</p>
      </header>

      {/* Summary Section */}
      <section className="portfolio-summary">
        <div className="summary-card">
          <h2>Total Investment</h2>
          <p>${totalInvestment}</p>
        </div>
        <div className="summary-card">
          <h2>Total Value</h2>
          <p>${totalCurrentValue}</p>
        </div>
        <div className="summary-card">
          <h2>Net ROI</h2>
          <p className={netROI >= 0 ? "positive" : "negative"}>{netROI}%</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="portfolio-filters">
        <h2>Filter by Category</h2>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Stock">Stock</option>
          <option value="Crypto">Crypto</option>
          <option value="Commodity">Commodity</option>
        </select>
      </section>

      {/* Chart Section */}
      <section className="portfolio-chart">
        <h2>Portfolio Distribution</h2>
        <div className="pie-chart-wrapper">
          <Pie data={chartData} />
        </div>
      </section>

      {/* Investment Breakdown Table */}
      <section className="portfolio-table">
        <h2>Investment Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Category</th>
              <th>Investment</th>
              <th>Current Value</th>
              <th>ROI</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.asset}</td>
                <td>{item.category}</td>
                <td>${item.investment}</td>
                <td>${item.currentValue}</td>
                <td className={item.roi >= 0 ? "positive" : "negative"}>
                  {item.roi}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Portfolio;
