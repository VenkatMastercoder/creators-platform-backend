"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.get("/get_user", userController_1.userAllController);
router.get("/get_user", userController_1.userAllController);
router.get("/:id", userController_1.userIdController);
router.get("/:id/products", userController_1.userProductsController);
router.put("/:id", userController_1.userIdUpdateController);
exports.default = router;
