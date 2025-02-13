import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./config/db";
import rootRouter from "./routes/indexRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// add middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/", rootRouter);

const startServer = async () => {
  try {
    console.log("process.env.DATABASE_URL");
    console.log(process.env.DATABASE_URL);
    await prisma.$connect();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();
