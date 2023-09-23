import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRouter from "./routes/userRouter";
import fileRouter from "./routes/fileRouter";
import { handleMulterError } from './middleware/ErrorHandler';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5003;

app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/file",fileRouter);

app.use(handleMulterError);

app.get('/', async (req: Request, res: Response) => {
  res.send('This From Backend');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});