"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var express_1 = require("express");
var cors_1 = require("cors");
var config_1 = require("./config/config");
var mongoose_1 = require("mongoose");
var Index = /** @class */ (function () {
    function Index(controller) {
        this.api = (0, express_1["default"])();
        this.connectMongoDB();
        this.startMiddlewares();
        this.startControllers(controller);
    }
    Index.prototype.startExpress = function () {
        this.api.listen(config_1.PORT, function () {
            return console.log("server is listening on ".concat(config_1.PORT));
        });
    };
    Index.prototype.startMiddlewares = function () {
        //Configuration
        this.api.use((0, cors_1["default"])(config_1.corsOptions));
        this.api.use(express_1["default"].json());
    };
    Index.prototype.startControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.api.use('/api', controller.router);
        });
    };
    Index.prototype.connectMongoDB = function () {
        mongoose_1["default"].set('strictQuery', false);
        mongoose_1["default"].connect(config_1.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(function () {
            console.log('Connected to database ');
        })["catch"](function (err) {
            console.error("Error connecting to the database. \n".concat(err));
        });
    };
    return Index;
}());
exports["default"] = Index;
