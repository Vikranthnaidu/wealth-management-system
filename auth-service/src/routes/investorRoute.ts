import express from "express";
import {
  createInvestor,
  getAllInvestors,
  getInvestorByPan,
  updateInvestor,
  deleteInvestor
} from "../controllers/investorController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/create", authenticate, authorize("ADMIN"), createInvestor);

router.get("/getall", authenticate, authorize("ADMIN"), getAllInvestors);

router.get("/pan/:pan", authenticate, getInvestorByPan);

router.put("/update/:investor_code", authenticate, updateInvestor);

router.delete("/delete/:investor_code", authenticate, authorize("ADMIN"), deleteInvestor);
export default router;
