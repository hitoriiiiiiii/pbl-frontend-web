import { Transaction } from "../models/Transaction.js";

const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addTransaction, getTransactionsByUser };
