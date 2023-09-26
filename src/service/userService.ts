import { Prisma } from "@prisma/client";
import prisma from "../utils/prismaClient";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getoneUsers(id: string) {
  try {
    const users = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        emailVerified: true,
        image: true,
        socialMediaLinks: true,
        // Explicitly exclude the fields you don't want
        hashedPassword: false,
        createdAt: false,
        updatedAt: false,
      }, where: { id: id },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getProducts(id: string) {
  try {
    const users = await prisma.user.findUnique({
      where: { id: id },
      select: {
        DigitProducts: true
      }
    });
    return users;
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
}

export async function updateUsers(id: string, name: string, bio: string, image: string, socialMediaLinks: string, username: string) {
  try {
    const users = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: name,
        bio: bio,
        image: image,
        socialMediaLinks: socialMediaLinks,
        username: username
      }
    });
    return { success: true, data:users };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = error.meta?.target as string[] | undefined;
      if (target?.includes('email')) {
        return { success: false, message: "Email is already in use." };
      } else if (target?.includes('username')) {
        return { success: false, message: "Username is already taken." };
      }
    }
    console.error("Error updating user:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
