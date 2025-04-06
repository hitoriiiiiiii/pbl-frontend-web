// controllers/pricingController.js

export const getPricingPlans = (req, res) => {
    const pricingPlans = [
      {
        id: 1,
        name: "Basic",
        price: "$10",
        features: ["Access to dashboard", "Basic analytics"],
      },
      {
        id: 2,
        name: "Pro",
        price: "$20",
        features: ["Advanced analytics", "Priority support"],
      },
      {
        id: 3,
        name: "Enterprise",
        price: "$30",
        features: ["All Pro features", "Dedicated account manager"],
      },
    ];
  
    res.status(200).json(pricingPlans);
  };
  