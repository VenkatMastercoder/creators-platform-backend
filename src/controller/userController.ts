import { Request, Response } from "express";
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
    res.status(500).send(error);
  }
};

export const userIdUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, name, bio, image, socialMediaLinks, username } = req.body as {
      email: string;
      name: string;
      bio: string;
      image: string;
      socialMediaLinks: string;
      username: string;
    };

    const data = await userService.updateUsers(id, email, name, bio, image, socialMediaLinks, username);

    if (data.success) {
      res.status(200).send("Data has been updated successfully.");
    } else {
      if (data.message === "Email is already in use." || data.message === "Username is already taken.") {
        res.status(400).send(data.message);
      } else {
        res.status(500).send(data.message);
      }
    }
  }
  catch (error) {
    console.error("Error in userIdUpdateController:", error);
    res.status(500).send("Internal Server Error");
  }
}
