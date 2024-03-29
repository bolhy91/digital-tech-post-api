"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var post_model_1 = require("./post.model");
var post_dto_1 = require("./dto/post.dto");
var auth_middleware_1 = require("../middleware/auth.middleware");
var validation_middleware_1 = require("../middleware/validation.middleware");
var multer_1 = require("../lib/multer");
var http_exception_1 = require("../shared/exceptions/http-exception");
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.path = '/posts';
        this.router = (0, express_1.Router)();
        this.postModel = post_model_1["default"];
        this.getPosts = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var posts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postModel.find({}).sort('create_at').populate('author').populate('likes')];
                    case 1:
                        posts = _a.sent();
                        response.json(posts);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createPost = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var postDto, image, newPost, save, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        postDto = request.body;
                        image = null;
                        if (request.files && request.files[0]) {
                            image = request.files[0].location;
                        }
                        newPost = new this.postModel(__assign(__assign({}, postDto), { author: request.user._id, image: image, create_at: Date.now() }));
                        return [4 /*yield*/, newPost.save()];
                    case 1:
                        save = _a.sent();
                        return [4 /*yield*/, save.populate('author').execPopulate()];
                    case 2:
                        _a.sent();
                        response.json({
                            post: save
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.likePost = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, user, post, userLikeExist, e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        id = request.params.id;
                        user = request.user;
                        return [4 /*yield*/, this.postModel.findById(id).exec()];
                    case 1:
                        post = _b.sent();
                        userLikeExist = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.includes(user._id);
                        if (userLikeExist) {
                            return [2 /*return*/, response.json(new http_exception_1["default"](302, 'Post contains a like from the user'))];
                        }
                        if (!post) return [3 /*break*/, 3];
                        return [4 /*yield*/, post.updateOne({ likes: __spreadArray(__spreadArray([], post.likes, true), [user._id], false) }, { "new": true })];
                    case 2:
                        _b.sent();
                        response.json(post);
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_2 = _b.sent();
                        next(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.startRoutes();
    }
    PostController.prototype.startRoutes = function () {
        this.router.get("".concat(this.path), this.getPosts);
        this.router
            .all("".concat(this.path, "/*"), auth_middleware_1["default"])
            .patch("".concat(this.path, "/:id/like"), this.likePost)
            .post("".concat(this.path), auth_middleware_1["default"], multer_1.multerStorage, (0, validation_middleware_1["default"])(post_dto_1.PostDto), this.createPost);
    };
    return PostController;
}());
exports["default"] = PostController;
