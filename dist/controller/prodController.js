"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDigitProdController = exports.deleteDigitProdController = exports.postDigitProdController = exports.getAllDigitProdController = void 0;
const prodService = __importStar(require("../service/prodService"));
const getAllDigitProdController = async (req, res) => {
    try {
        const data = await prodService.getAllDigitalProducts();
        res.status(200).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ error: 'Error Getting Digit Product' });
    }
};
exports.getAllDigitProdController = getAllDigitProdController;
const postDigitProdController = async (req, res) => {
    const productData = req.body;
    try {
        const post = await prodService.postDigitalProducts(productData);
        res.status(200).json({ message: "Post Data Successfully", post });
    }
    catch (error) {
        res.send(500).json({ error: 'Error Posting Digit Product' });
    }
};
exports.postDigitProdController = postDigitProdController;
const deleteDigitProdController = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prodService.deleteDigitalProduct(Number(id));
        res.status(200).json({ message: "Product deleted successfully", response });
    }
    catch (error) {
        res.status(500).json({ error: 'Error delete Digit Product' });
    }
};
exports.deleteDigitProdController = deleteDigitProdController;
async function updateDigitProdController(req, res) {
    try {
        const id = Number(req.params.id);
        const updatedProduct = await prodService.updateDigitProduct(id, req.body);
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating Digit Product' });
    }
}
exports.updateDigitProdController = updateDigitProdController;
