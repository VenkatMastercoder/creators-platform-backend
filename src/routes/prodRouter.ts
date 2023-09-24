import express, { Router } from "express";
import { deleteProdController, getAllDigitProdController, updateProdController } from "../controller/prodController";

const router: Router = express.Router();

router.get("/", getAllDigitProdController);

router.delete("/:id", deleteProdController);

router.patch("/:id", updateProdController);

export default router;