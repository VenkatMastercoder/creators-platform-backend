import { DigitProducts, Prisma } from "@prisma/client";
import prisma from "../utils/prismaClient";

export async function getAllDigitalProducts() {
  try {
    const prod = await prisma.digitProducts.findMany();
    return prod;
  } catch (error) {
    console.error("Error fetching prod:", error);
    throw error;
  }
}

export async function deleteDigitalProduct(id: number) {
  try {
    const prod = await prisma.digitProducts.delete({
      where: {
        id: id,
      },
    });
    return prod;
  } catch (error) {
    console.error("Error deleting prod:", error);
    throw error;
  }
}

export async function updateDigitProduct(id: number, data:Partial<DigitProducts>) {
  try {
    const response = await prisma.digitProducts.update({ where: { id }, data });
    return response;
  } catch (error) {
    throw new Error('Error updating Digital Product');
  }
}