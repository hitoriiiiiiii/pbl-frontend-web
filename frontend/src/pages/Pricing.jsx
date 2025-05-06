import React from 'react';
import './Pricing.css';

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
            <button className="select-button">Select</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
