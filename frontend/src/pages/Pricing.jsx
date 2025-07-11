import React from 'react';
import './Pricing.css';
import { createPaymentOrder } from "../Api";
// ✅ relative path to src/api.js

const plans = [
  {
    title: 'Basic',
    price: '₹0',
    features: ['Access to basic tools', 'Limited stock analysis', 'Community support'],
  },
  {
    title: 'Pro',
    price: '₹499/month',
    features: ['Advanced analytics', 'Portfolio tracking', 'Priority support'],
  },
  {
    title: 'Elite',
    price: '₹999/month',
    features: ['AI-powered recommendations', 'Live financial advisor', 'Exclusive webinars'],
  },
];

const handleSelectPlan = async (planName) => {
  try {
    const res = await createPaymentOrder(planName);
    const data = res.data;

    if (data.success) {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      script.onload = () => {
        const cashfree = new Cashfree(data.order.payment_session_id);
        cashfree.redirect();
      };
      document.body.appendChild(script);
    } else {
      alert("Payment Error: " + data.error);
    }
  } catch (err) {
    console.error("Payment Error:", err.response?.data || err.message);
    alert("Something went wrong: " + (err.response?.data?.error || err.message));
  }
};

const Pricing = () => {
  return (
    <section className="pricing-section">
      <h2 className="pricing-heading">Choose Your Plan</h2>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan(plan.title)}
              className="select-button"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
