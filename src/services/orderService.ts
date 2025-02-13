import prisma from "../config/db";

export const createOrderServie = async (
  userId: string,
  items: { groceryId: string; quantity: number }[]
) => {
  return prisma.$transaction(async (prisma) => {
    const groceries = await prisma.grocery.findMany({
      where: {
        id: { in: items.map((item) => item.groceryId) },
      },
    });

    const groceryStockMap = new Map(groceries.map((g) => [g.id, g.stock]));

    for (const item of items) {
      const stock = groceryStockMap.get(item.groceryId);
      if (stock === undefined || stock < item.quantity) {
        throw new Error(
          `Insufficient stock for item with ID ${item.groceryId}`
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map((item) => ({
            groceryId: item.groceryId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of items) {
      await prisma.grocery.update({
        where: { id: item.groceryId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
};

export const fetchOrdersServie = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { grocery: true } } },
  });
};
