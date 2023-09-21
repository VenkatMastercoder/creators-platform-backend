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