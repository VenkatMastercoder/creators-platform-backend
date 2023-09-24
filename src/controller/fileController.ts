import { Request, Response } from "express";
import { s3Uploadv2, s3Delete } from "../service/fileService";


export const fileUploadController = async (req: Request, res: Response) => {
    try {
        const results = await s3Uploadv2(req.files as Express.Multer.File[]);
        res.status(200).json({ status: "success", message: results });
    } catch (err: any) {
        res.status(500).json({ status: "error occurred", message: err.message });
    }
};

export const fileDeleteController = async (req: Request, res: Response) => {
    const fileKey = req.headers["filekey"] as string;
    try {
        const result = await s3Delete(fileKey);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ status: "error occurred", message: err.message });
    }
}

