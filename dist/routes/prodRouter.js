"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prodController_1 = require("../controller/prodController");
const router = express_1.default.Router();
router.get("/", prodController_1.getAllDigitProdController);
router.get("/:id", prodController_1.getId);
router.post("/add", prodController_1.postDigitProdController);
router.delete("/:id", prodController_1.deleteDigitProdController);
router.put("/:id", prodController_1.updateDigitProdController);
exports.default = router;
