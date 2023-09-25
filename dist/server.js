"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const fileRouter_1 = __importDefault(require("./routes/fileRouter"));
const prodRouter_1 = __importDefault(require("./routes/prodRouter"));
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/users", userRouter_1.default);
app.use("/api/v1/file", fileRouter_1.default);
app.use("/api/v1/digital_download", prodRouter_1.default);
app.use(ErrorHandler_1.handleMulterError);
app.get('/', async (req, res) => {
    res.send('This From Backend');
});
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`App listening on port ${PORT}`);
    console.log('====================================');
});
