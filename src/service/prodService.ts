import { DigitProducts, Prisma } from "@prisma/client";
import prisma from "../utils/prismaClient";
import { IProductData } from "../interface/product";

export async function getAllDigitalProducts() {
  try {
    const prod = await prisma.digitProducts.findMany();
    return prod;
  } catch (error) {
    console.error("Error fetching prod:", error);
    throw error;
  }
}

export async function getProductById(productId: number) {
  const product = await prisma.digitProducts.findUnique({
    where: {
      id: productId
    }
  })
  return product;
}

export async function postDigitalProducts(productData: IProductData) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: productData.email
      }
    })

    if (!user) {
      throw new Error('User not found');
    }

    const prod = await prisma.digitProducts.create({
      data: {
        productImgLink: productData.productImgLink,
        heading: productData.heading,
        subheading: productData.subheading,
        pricing: productData.pricing,
        buttonTitle: productData.buttonTitle,
        description: productData.description,
        userId: user.id,
        attachments: {
          create: [
            {
              fileUrl: productData.fileUrl,
            },
          ],
        },
      }
    });
    return prod;
  } catch (error) {
    console.error("Error creating product:", error);
    return error;
  }
}


export async function deleteDigitalProduct(id: number) {
  try {

    await prisma.attachment.deleteMany({
      where: {
        productId: id
      }
    });

    await prisma.buyer.deleteMany({
      where: {
        productId: id
      }
    });

    await prisma.stat.deleteMany({
      where: {
        productId: id
      }
    });

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

export async function updateDigitProduct(id: number, data: Partial<DigitProducts>) {
  try {
    const response = await prisma.digitProducts.update({ where: { id }, data });
    return response;
  } catch (error) {
    throw new Error('Error updating Digital Product');
  }
}
