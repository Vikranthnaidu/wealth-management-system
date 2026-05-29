import express from "express";
import {
  createStockPriceHistory,
  deleteStockPriceHistory,
  getAllStockPriceHistory,
  getStockPriceHistoryByCode,
} from "../controllers/stockPriceHistoryController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), createStockPriceHistory);
router.get("/get", authenticate, getAllStockPriceHistory);
router.get("/stock/:stock_code", authenticate, getStockPriceHistoryByCode);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteStockPriceHistory);

export default router;
