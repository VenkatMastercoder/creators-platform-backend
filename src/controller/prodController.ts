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

export const deleteProdController = async (req: Request, res: Response) => {

    try {
        const { id } = req.body as { id: number };

        const response = await prodService.deleteDigitalProduct(id);

        res.status(200).json({ message: "Product deleted successfully", response })
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }  
}
