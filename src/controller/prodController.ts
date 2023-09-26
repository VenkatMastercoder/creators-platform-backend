import { Request, Response } from "express";
import { IProductData } from "../interface/product";
import * as prodService from "../service/prodService";

export const getAllDigitProdController = async (req: Request, res: Response) => {
    try {
        const data = await prodService.getAllDigitalProducts();
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: 'Error Getting Digit Product' });
    }
}

export const getId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("ID:", id);
        const data = await prodService.getProductById(Number(id));
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: 'Error Getting Digit Product' });
    }
}

export const postDigitProdController = async (req: Request, res: Response) => {

    const productData = req.body as IProductData

    try {
        const post = await prodService.postDigitalProducts(productData);
        res.status(200).json({ message: "Post Data Successfully", post })
    }
    catch (error) {
        res.send(500).json({ error: 'Error Posting Digit Product' })
    }
}

export const deleteDigitProdController = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const response = await prodService.deleteDigitalProduct(Number(id));

        res.status(200).json({ message: "Product deleted successfully", response });
    } catch (error) {
        res.status(500).json({ error: 'Error delete Digit Product' });
    }
}

export async function updateDigitProdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedProduct = await prodService.updateDigitProduct(id, req.body);
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error updating Digit Product' });
    }
}