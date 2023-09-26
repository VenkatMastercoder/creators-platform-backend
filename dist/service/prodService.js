"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDigitProduct = exports.deleteDigitalProduct = exports.postDigitalProducts = exports.getAllDigitalProducts = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
async function getAllDigitalProducts() {
    try {
        const prod = await prismaClient_1.default.digitProducts.findMany();
        return prod;
    }
    catch (error) {
        console.error("Error fetching prod:", error);
        throw error;
    }
}
exports.getAllDigitalProducts = getAllDigitalProducts;
async function postDigitalProducts(productData) {
    try {
        const user = await prismaClient_1.default.user.findUnique({
            where: {
                email: productData.email
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const prod = await prismaClient_1.default.digitProducts.create({
            data: {
                productImgLink: productData.productImgLink,
                heading: productData.heading,
                subheading: productData.subheading,
                pricing: productData.pricing,
                buttonTitle: productData.buttonTitle,
                description: productData.description,
                userId: user.id,
                attachments: {
                    create: [
                        {
                            fileUrl: productData.fileUrl,
                        },
                    ],
                },
            }
        });
        return prod;
    }
    catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}
exports.postDigitalProducts = postDigitalProducts;
async function deleteDigitalProduct(id) {
    try {
        const prod = await prismaClient_1.default.digitProducts.delete({
            where: {
                id: id,
            },
        });
        return prod;
    }
    catch (error) {
        console.error("Error deleting prod:", error);
        throw error;
    }
}
exports.deleteDigitalProduct = deleteDigitalProduct;
async function updateDigitProduct(id, data) {
    try {
        const response = await prismaClient_1.default.digitProducts.update({ where: { id }, data });
        return response;
    }
    catch (error) {
        throw new Error('Error updating Digital Product');
    }
}
exports.updateDigitProduct = updateDigitProduct;
