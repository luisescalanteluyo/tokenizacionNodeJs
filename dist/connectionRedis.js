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
Object.defineProperty(exports, "__esModule", { value: true });
//import 'dotenv/config'
const redis_om_1 = require("redis-om");
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("************ connectionRedis.ts ini *************");
        const url = process.env.REDIS_URL;
        console.log("connection redis= " + url);
        const client = new redis_om_1.Client();
        const redisConn = yield client.open(url);
        // to check for connection. you can delete it after we have confirmed our connection is successful
        //const dbCheck = await client.execute(['PING']);
        console.log("REDIS", redisConn);
        console.log("************ connectionRedis.ts fin *************");
        return redisConn;
    });
}
exports.default = default_1;
//# sourceMappingURL=connectionRedis.js.map