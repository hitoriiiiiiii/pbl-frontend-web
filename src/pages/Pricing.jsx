import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <h1>Flexible Plans for Everyone</h1>
        <p>Choose the plan that best suits your financial needs. Upgrade anytime!</p>
      </header>

      <div className="pricing-cards">
        <div className="card">
          <h2>Starter</h2>
          <p className="price">
            <span className="currency">$</span>9.99 <span className="duration">/month</span>
          </p>
          <ul>
            <li>AI-powered Chat Assistance</li>
            <li>Basic Expense Tracking</li>
            <li>Monthly Portfolio Report</li>
          </ul>
          <button className="btn">Choose Starter</button>
        </div>

        <div className="card premium">
          <h2>Professional</h2>
          <p className="price">
            <span className="currency">$</span>19.99 <span className="duration">/month</span>
          </p>
          <ul>
            <li>All Starter Features</li>
            <li>Advanced Portfolio Analysis</li>
            <li>Real-time Market Updates</li>
            <li>Priority Support</li>
          </ul>
          <button className="btn btn-highlight">Choose Professional</button>
        </div>

        <div className="card">
          <h2>Enterprise</h2>
          <p className="price">Custom Pricing</p>
          <ul>
            <li>All Professional Features</li>
            <li>Custom Solutions for Teams</li>
            <li>Dedicated Account Manager</li>
            <li>24/7 Support</li>
          </ul>
          <button className="btn">Contact Us</button>
        </div>
      </div>

      <section className="additional-features">
        <h2>Why Choose FinAI?</h2>
        <div className="features">
          <div className="feature">
            <h3>AI-driven Insights</h3>
            <p>Optimize your investments and track expenses with advanced AI tools.</p>
          </div>
          <div className="feature">
            <h3>Seamless Integration</h3>
            <p>Integrates effortlessly with the tools and platforms you already use.</p>
          </div>
          <div className="feature">
            <h3>Transparent Pricing</h3>
            <p>What you see is what you pay. No hidden fees, no surprises.</p>
          </div>
        </div>
      </section>

      <div className="pricing-footer">
        <p>Start your journey to financial freedom today!</p>
        <button className="btn btn-footer">Get Started</button>
      </div>
    </div>
  );
};

export default Pricing;
