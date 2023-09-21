import express, { Router } from "express";
const router: Router = express.Router();

import { userAllController , userIdController} from "../controller/userController"

router.get("/all", userAllController);

router.get("/:id", userIdController);

export default router;