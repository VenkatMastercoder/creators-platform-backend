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
exports.userIdUpdateController = exports.userProductsController = exports.userAllController = exports.userUserNameController = exports.userIdController = void 0;
const userService = __importStar(require("../service/userService"));
const userIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getoneUsers(id);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error fetching specific user data:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.userIdController = userIdController;
const userUserNameController = async (req, res) => {
    try {
        const { username } = req.params;
        const data = await userService.getoneUsersWithUserName(username);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error fetching specific user data:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.userUserNameController = userUserNameController;
const userAllController = async (req, res) => {
    try {
        const data = await userService.getAllUsers();
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send(error);
    }
};
exports.userAllController = userAllController;
const userProductsController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getProducts(id);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.userProductsController = userProductsController;
const userIdUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bio, image, socialMediaLinks, username } = req.body;
        const data = await userService.updateUsers(id, name, bio, image, socialMediaLinks, username);
        if (data.success) {
            res.status(200).json({ message: "Success" });
        }
        else {
            if (data.message === "Email is already in use." || data.message === "Username is already taken.") {
                res.status(400).json({ message: data.message });
            }
            else {
                res.status(500).json({ message: data.message });
            }
        }
    }
    catch (error) {
        console.error("Error in userIdUpdateController:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.userIdUpdateController = userIdUpdateController;
