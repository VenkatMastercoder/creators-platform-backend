import { Request,Response } from "express";
import * as userService from "../service/userService";

export const userIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await userService.getoneUsers(id);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching specific user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const userAllController = async (req: Request, res: Response) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

