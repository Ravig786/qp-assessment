import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, placeOrder);
router.get("/", authenticateUser, getOrders); 

export default router;
