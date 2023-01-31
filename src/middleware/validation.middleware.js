"use strict";
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var http_exception_1 = require("../shared/exceptions/http-exception");
function validationMiddleware(type, skipMissingProperties) {
    if (skipMissingProperties === void 0) { skipMissingProperties = false; }
    return function (req, res, next) {
        (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(type, req.body), { skipMissingProperties: skipMissingProperties })
            .then(function (errors) {
            if (errors.length > 0) {
                var message = errors.map(function (error) { return Object.values(error.constraints); }).join(', ');
                next(new http_exception_1["default"](400, message));
            }
            else {
                next();
            }
        });
    };
}
exports["default"] = validationMiddleware;
