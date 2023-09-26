import express, { Router } from "express";
import { userAllController, userIdController, userIdUpdateController, userProductsController } from "../controller/userController"

const router: Router = express.Router();

router.get("/get_user",userAllController);

router.get("/:id", userIdController);

router.get("/:id/products", userProductsController);

router.put("/:id", userIdUpdateController);

export default router;