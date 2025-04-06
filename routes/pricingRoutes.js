// routes/pricingRoutes.js

import express from "express";
import { getPricingPlans } from "../controllers/pricingController.js";

const router = express.Router();

router.get("/", getPricingPlans); // localhost:5000/api/pricing/

export default router;
