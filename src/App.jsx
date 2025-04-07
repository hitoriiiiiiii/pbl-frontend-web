import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import FinAiChat from "./pages/FinAi";
import PortfolioTransaction from "./pages/PortfolioTransaction";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import "./assets/styles/global.css";

const App = () => {
  return (
    <div className="main-content">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <NavLink to="/" className="logo-link">
            <span className="logo-highlight">market</span>Fish
          </NavLink>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/finai"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                marketFish
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/finai" element={<FinAiChat />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/transactions" element={<PortfolioTransaction />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <footer>
        <p>Made with ❤️ by Prarthana, Ruturaj, and Uday Kiran for PBL Project</p>
      </footer>
    </div>
  );
};

export default App;
