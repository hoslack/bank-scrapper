"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    accountNumber: {
        type: String,
        required: false
    },
    accountName: {
        type: String,
        required: false
    },
    accountType: {
        type: String,
        required: false
    },
    accountCurrency: {
        type: String,
        required: false
    },
    ledgerBalance: {
        type: Number,
        required: false
    },
    availableBalance: {
        type: Number,
        required: false
    }
});
exports.default = mongoose_1.default.model('Hos-Account', accountSchema);
