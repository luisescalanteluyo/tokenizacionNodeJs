"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("************ index.ts main ini*************");
require("dotenv/config");
//import * as dotenv from "dotenv";
//console.log("__dirname: ",__dirname);
//dotenv.config({ path: 'D:\LUIS\Tokenizacion'+'/.env' });
const PORT = process.env.PORT;
// console.log("PORT: ",PORT);
// const REDIS_URL  = process.env.REDIS_URL;
// console.log("REDIS_URL: ",REDIS_URL);
const app_1 = __importDefault(require("./app"));
//import RedisClient  from './connectionRedis';
const redisService_1 = require("./redisService");
//import aas  from './';
//import { createClient } from 'redis';
//import { Client } from 'redis-om'
//getCache();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // app.listen(app.get('port'));
        app_1.default.listen(PORT);
        yield (0, redisService_1.getCache)();
        //  const sss= await getCache();
        //await RedisClient();
        //  const client = new Client()
        //const redisConn =  client.open('redis://localhost:6379')
        //console.log("server on port: ",app.get('port'));
        console.log("server on port: " + PORT);
        console.log("************ index.ts main fin*************");
    });
}
main();
//# sourceMappingURL=index.js.map