"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || '';
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
try {
    mongoose_1.default.connect(MONGO_URL, {});
    console.log('MongoDB connected');
}
catch (err) {
    console.log('MongoDB connection error', err);
}
mongoose_1.default.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
