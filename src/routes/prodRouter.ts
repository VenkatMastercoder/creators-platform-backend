import express, { Router } from "express";
import { deleteProdController, getAllDigitProdController } from "../controller/prodController";

const router: Router = express.Router();

router.get("/", getAllDigitProdController);


router.delete("/:id", deleteProdController);

export default router;