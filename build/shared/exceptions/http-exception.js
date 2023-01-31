"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    messageJson() {
        return { status: this.status, message: this.message };
    }
}
exports.default = HttpException;
