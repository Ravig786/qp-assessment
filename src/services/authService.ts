import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUserServie = async (email: string, password: string, role: "ADMIN" | "USER") => {
  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "ADMIN") {
    return prisma.admin.create({ data: { email, password: hashedPassword } });
  } else {
    return prisma.user.create({ data: { email, password: hashedPassword } });
  }
};

export const loginUserServie = async (email: string, password: string) => {
  
  const admin = await prisma.admin.findUnique({ where: { email } });

  const user = admin ? null : await prisma.user.findUnique({ where: { email } });

  if (!admin && !user) throw new Error("Invalid credentials");

  const account = admin || user;

  if (!account) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const role = admin ? "ADMIN" : "USER";

  return jwt.sign({ id: account.id, role }, JWT_SECRET, { expiresIn: "1d" });
};
