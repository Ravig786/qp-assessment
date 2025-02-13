import { addGroceryHandler,getGroceriesHandler,updateGroceryHandler,deleteGroceryHandler, addMultipleGroceryHandler } from '../controllers/groceryController';
import { authenticateUser, authorizeAdmin } from './../middleware/authMiddleware';
import express from "express";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, addGroceryHandler); 
router.post("/bulk", authenticateUser, authorizeAdmin, addMultipleGroceryHandler); 
router.get("/", authenticateUser, getGroceriesHandler); 
router.put("/:id", authenticateUser, authorizeAdmin, updateGroceryHandler); 
router.delete("/:id", authenticateUser, authorizeAdmin, deleteGroceryHandler);

export default router;
