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
        const { id } = req.params;

        const response = await prodService.deleteDigitalProduct(Number(id));

        res.status(200).json({ message: "Product deleted successfully", response })
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }  
}

export async function updateProdController(req: Request, res: Response) {
    try {

      const id = Number(req.params.id);
      const updatedProduct = await prodService.updateDigitProduct(id, req.body);

      res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Error updating Digit Product' });
    }
  }