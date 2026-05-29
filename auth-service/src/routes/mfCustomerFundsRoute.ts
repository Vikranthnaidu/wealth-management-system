import express from "express";

import {
  createCustomerFund,
  getAllCustomerFunds,
  getCustomerFundsByPan,
  deleteCustomerFunds
} from "../controllers/mfCustomerFundsController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createCustomerFund);

router.get("/get", authenticate, authorize("ADMIN"), getAllCustomerFunds);

router.get("/pan/:pan", authenticate, getCustomerFundsByPan);

router.delete("/delete/:id", authenticate, authorize("ADMIN"), deleteCustomerFunds);


export default router;
