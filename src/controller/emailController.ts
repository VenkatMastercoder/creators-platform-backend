import { Request, Response } from "express";
import { sendEmailService } from "../service/emailService";

export const sendEmailController = async (req: Request, res: Response) => {

    const email = req.headers["email"] as string;
    const productId = req.headers["productid"] as string;

    if (!email || !productId) {
        res.status(400).send({status: false, message: "Missing email or productId"});
    }

    try {
        const response = await sendEmailService(email, productId);
        res.status(200).send({status: true, ...response});
    } catch (error: any) {
        res.status(400).send({status: false, message: error.message});
    }
}