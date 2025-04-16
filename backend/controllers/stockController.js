import { Stock } from "../models/Stock.js";

export const addStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.params.userId });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
