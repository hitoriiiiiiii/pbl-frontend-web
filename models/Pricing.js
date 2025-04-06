import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  features: {
    type: [String], // Example: ["Feature A", "Feature B"]
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

export const Pricing = mongoose.model("Pricing", pricingSchema);
