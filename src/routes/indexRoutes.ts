import { Router } from "express";
import authRoutes from "./authRoutes";
import groceryRoute from "./groceryRoutes";
import orderRoute from "./orderRoutes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/groceries", groceryRoute);
rootRouter.use("/orders", orderRoute);

export default rootRouter;
