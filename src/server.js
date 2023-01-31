"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var auth_controller_1 = require("./auth/auth.controller");
var user_controller_1 = require("./user/user.controller");
var post_controller_1 = require("./post/post.controller");
var api = new index_1["default"]([
    new auth_controller_1["default"](),
    new user_controller_1["default"](),
    new post_controller_1["default"]()
]);
api.startExpress();
