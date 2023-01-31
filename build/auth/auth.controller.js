"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_service_1 = __importDefault(require("./auth.service"));
const multer_1 = require("../lib/multer");
const http_exception_1 = __importDefault(require("../shared/exceptions/http-exception"));
const login_dto_1 = require("./dto/login.dto");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const role_enum_1 = require("../shared/enums/role.enum");
const config_1 = require("../config/config");
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.userModel = user_model_1.default;
        this.register = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, surname, username } = request.body;
            try {
                let role = role_enum_1.Role.USER;
                if (request.body.role) {
                    role = request.body.role;
                }
                let avatar = config_1.AVATAR_DEFAULT;
                if (request.files && request.files[0]) {
                    avatar = request.files[0].location;
                }
                const newUser = { name, surname, username, role, avatar };
                const { token, user } = yield this.authService.register(newUser);
                response.json({ token, user });
            }
            catch (error) {
                console.log("ERROR OBTENIDO", error);
                response.json(error.messageJson());
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const loginDto = request.body;
            const userLogin = yield this.userModel.findOne({ username: loginDto.username }).exec();
            if (userLogin) {
                const token = this.authService.createToken(userLogin);
                response.json({
                    token,
                    user: userLogin
                });
            }
            else {
                next(new http_exception_1.default(400, 'Credentials invalid'));
            }
        });
        this.authService = new auth_service_1.default();
        this.startRoutes();
    }
    startRoutes() {
        this.router.post(`${this.path}/register`, multer_1.multerStorage, this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(login_dto_1.LoginDto), this.login);
    }
}
exports.default = AuthController;
