import React, { useState } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import FinAiChat from "./pages/FinAi";
import BuyStocks from "./pages/BuyStocks";
import PortfolioTransaction from "./pages/PortfolioTransaction";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/Login";
import "./assets/styles/global.css";

const App = () => {
  return (
    <div className="main-content">
      <Routes>
        {/* Public Route (Login Page) */}
        <Route path="login" element={<LoginPage />} />

        {/* Routes that are available without authentication */}
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="finai" element={<FinAiChat />} />
          <Route path="buystocks" element={<BuyStocks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="transactions" element={<PortfolioTransaction />} />
        </Route>
      </Routes>
    </div>
  );
};

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <NavLink to="/" className="logo-link">
            <span className="logo-highlight">market</span>Fish
          </NavLink>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-list ${isMenuOpen ? "show" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/finai"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              marketFish
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/buystocks"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              BuyStocks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </header>

      {/* Main Content Section */}
      <main>
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer>
        <p>Made with ❤️ by Prarthana, Ruturaj, and Uday Kiran for PBL Project</p>
      </footer>
    </>
  );
};

export default App;
