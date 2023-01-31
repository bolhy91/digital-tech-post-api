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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const mongoose_1 = __importDefault(require("mongoose"));
class Index {
    constructor(controller) {
        this.api = (0, express_1.default)();
        this.connectMongoDB();
        this.startMiddlewares();
        this.startControllers(controller);
    }
    startExpress() {
        this.api.listen(config_1.PORT, () => {
            return console.log(`server is listening on ${config_1.PORT}`);
        });
    }
    startMiddlewares() {
        //Configuration
        this.api.use((0, cors_1.default)(config_1.corsOptions));
        this.api.use(express_1.default.json());
    }
    startControllers(controllers) {
        controllers.forEach((controller) => {
            this.api.use('/api', controller.router);
        });
    }
    connectMongoDB() {
        mongoose_1.default.set('strictQuery', false);
        mongoose_1.default.connect(config_1.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
            console.log('Connected to database ');
        }).catch((err) => {
            console.error(`Error connecting to the database. \n${err}`);
        });
    }
}
exports.default = Index;
