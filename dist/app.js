"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("************ app.ts main ini*************");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const morgan_1 = __importDefault(require("morgan"));
//import dotenv from 'dotenv';
//dotenv.config();
const app = (0, express_1.default)();
//const PORT =  process.env.PORT_API
//settinng
//app.set('port',PORT);
//middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
//routs
app.use('/api', auth_1.default);
exports.default = app;
console.log("************ app.ts main fin*************");
//# sourceMappingURL=app.js.map