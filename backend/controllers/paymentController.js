import axios from "axios";

const planPrices = {
  Basic: 0,
  Pro: 499,
  Elite: 999,
};

export const createOrder = async (req, res) => {
  const { plan } = req.body;
  const amount = planPrices[plan];

  if (amount === undefined) {
    return res.status(400).json({ success: false, error: "Invalid plan selected." });
  }

  try {
    const order_id = `order_${Date.now()}`;

    const orderPayload = {
      order_id,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `guest_${Date.now()}`,           // ✅ REQUIRED
        customer_email: "guest@example.com",           // ✅ REQUIRED
        customer_phone: "9999999999",                  // ✅ REQUIRED
        customer_name: "Guest User",                   // ✅ Optional
      },
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        },
      }
    );

    res.status(200).json({ success: true, order: response.data });
  } catch (err) {
    console.error("Cashfree error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
