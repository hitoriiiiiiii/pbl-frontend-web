// routes/stock.routes.js
import express from 'express';
import {
  addStock,
  getUserStocks,
  updateStock,
  deleteStock
} from '../controllers/stockController.js';

const router = express.Router();

router.post('/', addStock);                   // Add new stock
router.get('/:userId', getUserStocks);        // Get all stocks for a user
router.put('/:id', updateStock);              // Update stock info
router.delete('/:id', deleteStock);           // Remove stock

export default router;
