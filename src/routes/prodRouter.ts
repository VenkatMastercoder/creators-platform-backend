import express, { Router } from "express";
import { deleteDigitProdController, getAllDigitProdController, postDigitProdController, updateDigitProdController ,getId} from "../controller/prodController";

const router: Router = express.Router();

router.get("/", getAllDigitProdController);

router.get("/:id", getId);

router.post("/add", postDigitProdController);

router.delete("/:id", deleteDigitProdController);

router.put("/:id", updateDigitProdController);

export default router;