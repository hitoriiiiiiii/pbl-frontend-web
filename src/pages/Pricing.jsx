import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h2 className="pricing-title">Affordable Plans for Everyone</h2>
        <p className="pricing-description">
          Discover the perfect plan for your financial goals.
        </p>

        <div className="pricing-cards">
          {/* Basic Plan */}
          <div className="pricing-card">
            <h3 className="plan-name">Basic</h3>
            <p className="plan-price">$9.99<span>/month</span></p>
            <ul className="plan-features">
              <li>Essential tools and insights</li>
              <li>Up to 3 portfolios</li>
              <li>Email support</li>
            </ul>
            <button className="btn-select">Get Basic</button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card popular">
            <h3 className="plan-name">Pro</h3>
            <p className="plan-price">$24.99<span>/month</span></p>
            <ul className="plan-features">
              <li>Unlimited portfolios</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
            <button className="btn-select">Get Pro</button>
          </div>

          {/* Premium Plan */}
          <div className="pricing-card">
            <h3 className="plan-name">Premium</h3>
            <p className="plan-price">$49.99<span>/month</span></p>
            <ul className="plan-features">
              <li>Everything in Pro</li>
              <li>Dedicated advisor</li>
              <li>Custom reports</li>
            </ul>
            <button className="btn-select">Get Premium</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
