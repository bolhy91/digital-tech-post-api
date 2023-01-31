"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var role_enum_1 = require("../shared/enums/role.enum");
var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    role: {
        type: String,
        required: true,
        "default": role_enum_1.Role.USER,
        "enum": role_enum_1.Role
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    }
});
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});
var userModel = mongoose.model('User', userSchema);
exports["default"] = userModel;
