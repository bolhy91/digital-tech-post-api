"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var post_status_enum_1 = require("../shared/enums/post-status.enum");
var postSchema = new mongoose_1["default"].Schema({
    image: String,
    message: String,
    likes: [
        { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' }
    ],
    author: {
        ref: 'User',
        type: mongoose_1["default"].Schema.Types.ObjectId
    },
    create_at: Date,
    location: String,
    status: {
        type: String,
        required: true,
        "enum": post_status_enum_1.PostStatus,
        "default": post_status_enum_1.PostStatus.DRAFTED
    }
});
var postModel = mongoose_1["default"].model('Post', postSchema);
exports["default"] = postModel;
