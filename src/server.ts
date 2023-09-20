import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5001;
const prisma = new PrismaClient();

app.use(cors());

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}


async function getoneUsers(idd: string) {
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
      }, where: { id: idd },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

app.get("/api/user", async (req: Request, res: Response) => {
  const data = await getAllUsers();
  res.status(200).json({ data });
});

app.get("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getoneUsers(id);
  res.status(200).json({ data });
});


app.get('/', async (req: Request, res: Response) => {
  res.send('This From Backend');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});