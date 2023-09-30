"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsers = exports.getProducts = exports.getoneUsersWithUserName = exports.getoneUsers = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
async function getAllUsers() {
    try {
        const users = await prismaClient_1.default.user.findMany();
        return users;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
exports.getAllUsers = getAllUsers;
async function getoneUsers(id) {
    try {
        const users = await prismaClient_1.default.user.findUnique({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                emailVerified: true,
                image: true,
                socialMediaLinks: true,
                hashtags: true,
                // Explicitly exclude the fields you don't want
                hashedPassword: false,
                createdAt: false,
                updatedAt: false,
            }, where: { id: id },
        });
        return users;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
exports.getoneUsers = getoneUsers;
async function getoneUsersWithUserName(username) {
    try {
        const users = await prismaClient_1.default.user.findUnique({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                emailVerified: true,
                image: true,
                socialMediaLinks: true,
                hashtags: true,
                // Explicitly exclude the fields you don't want
                hashedPassword: false,
                createdAt: false,
                updatedAt: false,
            }, where: { username: username },
        });
        return users;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
exports.getoneUsersWithUserName = getoneUsersWithUserName;
async function getProducts(id) {
    try {
        const users = await prismaClient_1.default.user.findUnique({
            where: { id: id },
            select: {
                DigitProducts: true
            }
        });
        return users;
    }
    catch (error) {
        console.error("Error fetching user products:", error);
        throw error;
    }
}
exports.getProducts = getProducts;
async function updateUsers(id, name, bio, image, socialMediaLinks, username, hashtags) {
    var _a;
    try {
        const users = await prismaClient_1.default.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                bio: bio,
                image: image,
                socialMediaLinks: socialMediaLinks,
                hashtags: hashtags,
                username: username
            }
        });
        return { success: true, data: users };
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            const target = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
            if (target === null || target === void 0 ? void 0 : target.includes('email')) {
                return { success: false, message: "Email is already in use." };
            }
            else if (target === null || target === void 0 ? void 0 : target.includes('username')) {
                return { success: false, message: "Username is already taken." };
            }
        }
        console.error("Error updating user:", error);
        return { success: false, message: "Internal Server Error" };
    }
}
exports.updateUsers = updateUsers;
