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
const post_model_1 = __importDefault(require("./post.model"));
const post_dto_1 = require("./dto/post.dto");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const multer_1 = require("../lib/multer");
const http_exception_1 = __importDefault(require("../shared/exceptions/http-exception"));
class PostController {
    constructor() {
        this.path = '/posts';
        this.router = (0, express_1.Router)();
        this.postModel = post_model_1.default;
        this.getPosts = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postModel.find({}).sort('create_at').populate('author').populate('likes');
                response.json(posts);
            }
            catch (error) {
                next(error);
            }
        });
        this.createPost = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postDto = request.body;
                let image = null;
                if (request.files && request.files[0]) {
                    image = request.files[0].location;
                }
                const newPost = new this.postModel(Object.assign(Object.assign({}, postDto), { author: request.user._id, image, create_at: Date.now() }));
                const save = yield newPost.save();
                yield save.populate('author').execPopulate();
                response.json({
                    post: save
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.likePost = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = request.params.id;
                const user = request.user;
                const post = yield this.postModel.findById(id).exec();
                const userLikeExist = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.includes(user._id);
                if (userLikeExist) {
                    return response.json(new http_exception_1.default(302, 'Post contains a like from the user'));
                }
                if (post) {
                    yield post.updateOne({ likes: [...post.likes, user._id] }, { new: true });
                    response.json(post);
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.startRoutes();
    }
    startRoutes() {
        this.router.get(`${this.path}`, this.getPosts);
        this.router
            .all(`${this.path}/*`, auth_middleware_1.default)
            .patch(`${this.path}/:id/like`, this.likePost)
            .post(`${this.path}`, auth_middleware_1.default, multer_1.multerStorage, (0, validation_middleware_1.default)(post_dto_1.PostDto), this.createPost);
    }
}
exports.default = PostController;
