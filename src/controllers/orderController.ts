import { Request, Response } from "express";
import { createOrderServie, fetchOrdersServie } from "../services/orderService";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { items } = req.body; 
    
    const order = await createOrderServie(userId, items);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await fetchOrdersServie(userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
