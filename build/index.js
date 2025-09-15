"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_record_1 = __importDefault(require("./routes/financial-record"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
if (!mongoUri) {
    console.error('ERROR: MONGO_URI is not defined in the .env file or environment variables.');
    process.exit(1);
}
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log('MongoDB connected successfully.');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
app.use("/financial-records", financial_record_1.default);
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
