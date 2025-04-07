import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to marketFish</h1>
        <p>Your AI-powered financial companion for smarter investments.</p>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon">💡</i>
            <h3>AI-Powered Insights</h3>
            <p>Get real-time financial insights tailored to your portfolio.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">📊</i>
            <h3>Portfolio Management</h3>
            <p>Easily track, manage, and optimize your investments.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">📈</i>
            <h3>Automated Predictions</h3>
            <p>Receive AI-driven predictions to stay ahead of the market.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">💬</i>
            <h3>Chat with marketFish</h3>
            <p>Ask marketFish for financial advice anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Real-Life Applications Section */}
      <section className="applications">
        <h2>Real-Life Applications</h2>
        <ul>
          <li>Track spending and budget with personalized AI insights.</li>
          <li>Analyze stock trends for smarter investment decisions.</li>
          <li>Monitor cryptocurrency portfolios with real-time updates.</li>
          <li>Automate financial reporting for businesses and individuals.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
