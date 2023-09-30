"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDigitProduct = exports.deleteDigitalProduct = exports.postDigitalProducts = exports.getProductById = exports.getAllDigitalProducts = void 0;
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
async function getProductById(productId) {
    try {
        const product = await prismaClient_1.default.digitProducts.findUnique({
            where: {
                id: productId
            }
        });
        const attachment = await prismaClient_1.default.digitProducts.findUnique({
            where: {
                id: productId
            },
            select: {
                attachments: true
            }
        });
        const result = {
            product, attachment
        };
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.getProductById = getProductById;
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
        return error;
    }
}
exports.postDigitalProducts = postDigitalProducts;
async function deleteDigitalProduct(id) {
    try {
        await prismaClient_1.default.attachment.deleteMany({
            where: {
                productId: id
            }
        });
        await prismaClient_1.default.buyer.deleteMany({
            where: {
                productId: id
            }
        });
        await prismaClient_1.default.stat.deleteMany({
            where: {
                productId: id
            }
        });
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
    const { fileUrl, ...productData } = data;
    console.log(fileUrl);
    console.log("::", data);
    console.log("idd:", id);
    try {
        const updatedProduct = await prismaClient_1.default.digitProducts.update({
            where: { id },
            data: productData,
        });
        if (fileUrl) {
            const attachment = await prismaClient_1.default.attachment.findFirst({
                where: { productId: id },
            });
            console.log("att:", attachment);
            if (attachment) {
                const a = await prismaClient_1.default.attachment.update({
                    where: { id: attachment.id },
                    data: { fileUrl: fileUrl },
                });
                console.log("ans:", a);
            }
            else {
                console.log(fileUrl);
                const result = await prismaClient_1.default.attachment.create({
                    data: { fileUrl: fileUrl, productId: id }
                });
                console.log("ansss::", result);
            }
        }
        return updatedProduct;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error updating Digital Product');
    }
}
exports.updateDigitProduct = updateDigitProduct;
