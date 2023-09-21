import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5003;

import userRouter from "./routes/userRouter";

app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('This From Backend');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});