"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tarjeta_1 = __importDefault(require("./tarjeta"));
class Token {
    constructor() {
        this.token = "";
        this.data = new tarjeta_1.default();
    }
}
exports.default = Token;
//# sourceMappingURL=token.js.map