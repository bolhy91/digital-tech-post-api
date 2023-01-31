"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const post_controller_1 = __importDefault(require("./post/post.controller"));
const api = new index_1.default([
    new auth_controller_1.default(),
    new user_controller_1.default(),
    new post_controller_1.default()
]);
api.startExpress();
