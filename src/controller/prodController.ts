import { Request, Response } from "express";
import * as prodService from "../service/prodService";

export const getAllDigitProdController = async (req: Request, res: Response) => {

    try {
        const data = await prodService.getAllDigitalProducts();
        res.status(200).json({ data });
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }

}