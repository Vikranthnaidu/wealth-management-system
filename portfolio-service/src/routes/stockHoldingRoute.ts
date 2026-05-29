import express from "express";

import {
  createStockHolding,
  getAllStockHoldings,
  getStockHoldingsByPan,
  deleteStockHolding
} from "../controllers/stockHoldingController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createStockHolding);

router.get("/get", authenticate, authorize("ADMIN"), getAllStockHoldings);

router.get("/pan/:pan", authenticate, getStockHoldingsByPan);

router.delete("/delete/:id", authenticate, authorize("ADMIN"), deleteStockHolding);

export default router;
