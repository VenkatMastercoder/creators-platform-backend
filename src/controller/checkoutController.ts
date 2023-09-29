import { Request, Response } from "express";
import { sendEmailService } from "../service/checkoutService";

export const sendEmailController = async (req: Request, res: Response) => {
    const name = req.headers["name"] as string;
    const email = req.headers["email"] as string;
    const productId = req.headers["productid"] as string;

    if (!email || !productId) {
        res.status(400).send({status: false, message: "Missing email or productId"});
    }

    try {
        const response = await sendEmailService(name, email, productId);
        res.status(200).send({status: true, ...response});
    } catch (error: any) {
        res.status(400).send({status: false, message: error.message});
    }
}