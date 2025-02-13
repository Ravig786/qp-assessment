import { Request, Response } from "express";
import { registerUserServie, loginUserServie } from "../services/authService";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUserServie(email, password, role);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserServie(email, password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        expires: oneHourFromNow(),
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);
