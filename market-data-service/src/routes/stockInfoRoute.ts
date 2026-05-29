import express from "express";
import {
  createStockInfo,
  deleteStockInfo,
  getAllStockInfo,
  getStockInfoByCode,
  updateStockInfo,
} from "../controllers/stockInfoController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), createStockInfo);
router.get("/get", authenticate, getAllStockInfo);
router.get("/:stock_code", authenticate, getStockInfoByCode);
router.put("/:stock_code", authenticate, authorize("ADMIN"), updateStockInfo);
router.delete("/:stock_code", authenticate, authorize("ADMIN"), deleteStockInfo);

export default router;
