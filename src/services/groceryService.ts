import prisma from "../config/db";

export const createGroceryServie = async (name: string, price: number, stock: number, adminId: string) => {
  return prisma.grocery.create({
    data: { name, price, stock, adminId },
  });
};

export const createMultipleGroceriesServie = async (groceries: { name: string; price: number; stock: number }[], adminId: string) => {
  if (!Array.isArray(groceries) || groceries.length === 0) {
    throw new Error("Invalid grocery data. Provide a non-empty array of groceries.");
  }

  const groceryData = groceries.map((grocery) => ({
    name: grocery.name,
    price: grocery.price,
    stock: grocery.stock,
    adminId: adminId,
  }));

  return prisma.grocery.createMany({
    data: groceryData,
    skipDuplicates: true,
  });
};

export const fetchGroceriesServie = async (page: number = 1, pageSize: number = 10) => {
  const skip = (page - 1) * pageSize;
  const groceries = await prisma.grocery.findMany({
    skip,
    take: pageSize,
  });

  const totalCount = await prisma.grocery.count();

  return {
    data: groceries,
    total: totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};



export const updateGroceryService = async (id: string, data: { name?: string; price?: number; stock?: number }) => {
  return prisma.grocery.update({
    where: { id },
    data,
  });
};

export const removeGroceryServie = async (id: string) => {
  return prisma.grocery.delete({ where: { id } });
};
