"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const post_status_enum_1 = require("../shared/enums/post-status.enum");
const postSchema = new mongoose_1.default.Schema({
    image: String,
    message: String,
    likes: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
    ],
    author: {
        ref: 'User',
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    create_at: Date,
    location: String,
    status: {
        type: String,
        required: true,
        enum: post_status_enum_1.PostStatus,
        default: post_status_enum_1.PostStatus.DRAFTED
    }
});
const postModel = mongoose_1.default.model('Post', postSchema);
exports.default = postModel;
