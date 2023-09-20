import { PrismaClient } from '@prisma/client';
import express, { Express, Application, Request, Response } from 'express';
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5001;

const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

app.use("/api/user",async (req: Request, res: Response) => {
  const data = await getAllUsers();
  res.status(200).json({ data });
});

app.get('/',async (req: Request, res: Response) => {
  res.send('This From Backend');
} );

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});