import { Request, Response } from "express";
import {
  createGroceryServie,
  fetchGroceriesServie,
  updateGroceryService,
  removeGroceryServie,
  createMultipleGroceriesServie,
} from "../services/groceryService";

export const addGroceryHandler = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const adminId = (req as any).user.id;
    const grocery = await createGroceryServie(name, price, stock, adminId);
    res
      .status(201)
      .json({ message: "Grocery item added successfully", grocery });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const addMultipleGroceryHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const adminId = (req as any).user.id;
    const groceries = req.body.groceries;

    if (!Array.isArray(groceries) || groceries.length === 0) {
      return res
        .status(400)
        .json({
          error: "Invalid grocery data. Provide an array of groceries.",
        });
    }

    const groceryData = groceries.map((grocery) => ({
      name: grocery.name,
      price: grocery.price,
      stock: grocery.stock,
      adminId: adminId,
    }));

    const grocery = await createMultipleGroceriesServie(groceryData, adminId);
    res
      .status(201)
      .json({ message: "Grocery item added successfully", grocery });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getGroceriesHandler = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const groceries = await fetchGroceriesServie(page, pageSize);

    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateGroceryHandler = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const { id } = req.params;
    const updatedGrocery = await updateGroceryService(id, {
      name,
      price,
      stock,
    });
    res.status(200).json({ message: "Grocery item updated", updatedGrocery });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteGroceryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeGroceryServie(id);
    res.status(200).json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
