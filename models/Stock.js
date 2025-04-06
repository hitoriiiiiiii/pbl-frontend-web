import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true, // e.g. AAPL, TSLA
  },
  companyName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  averagePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  currentValue: {
    type: Number,
    default: 0, // can be updated using APIs or cron jobs
  }
}, { timestamps: true });

export const Stock = mongoose.model("Stock", stockSchema);
