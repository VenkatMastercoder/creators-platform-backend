import express, { Router } from "express";


const router: Router = express.Router();

import { userAllController, userIdController, userIdUpdateController } from "../controller/userController"

router.get("/all",userAllController);

router.get("/:id", userIdController);

router.put("/:id", userIdUpdateController);

export default router;