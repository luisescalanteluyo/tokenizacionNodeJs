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
exports.ReadRedis = exports.WriteRedis = exports.getCache = void 0;
const redis_1 = require("redis");
//import { config } from '@app/config'
//import { logger } from '@app/utils/logger'
let redisClient;
let isReady;
const urlRedis = process.env.REDIS_URL;
const cacheOptions = { url: urlRedis, };
Object.assign(cacheOptions, {
    socket: {
        // keepAlive: 300, // 5 minutes DEFAULT
        tls: false,
    },
});
function getCache() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isReady) {
            redisClient = (0, redis_1.createClient)(Object.assign({}, cacheOptions));
            redisClient.on('error', err => console.log(`Redis Error: ${err}`));
            redisClient.on('connect', () => console.log('Redis connected'));
            redisClient.on('reconnecting', () => console.log('Redis reconnecting'));
            redisClient.on('ready', () => {
                isReady = true;
                console.log('Redis ready!');
            });
            yield redisClient.connect();
        }
        return redisClient;
    });
}
exports.getCache = getCache;
const WriteRedis = (key, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cache = yield getCache();
    // await cache.setEx(1, 60, JSON.stringify('account'))
    //const resultx =await cache.set (key,data);
    const result = yield cache.set(key, data);
    //const result =await cache.hSet(key, 60, data);
    //  const result =await cache.hSet(key, {
    //     name: 'John',
    //     data: data
    // });
    /*
    const result =await cache.json.set('target', 'group', {
        "name": "Paul John",
        "email": "paul.john@example.com",
        "age": 42,
        "city": "London"
    });*/
    return result;
});
exports.WriteRedis = WriteRedis;
const ReadRedis = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const cache = yield getCache();
    // await cache.setEx(1, 60, JSON.stringify('account'))
    const result = yield cache.get(key);
    //  const result =await cache.set(key,data);
    // const resultx =await cache.hSet('', 60, JSON.stringify(modelTarjeta))
    return result;
});
exports.ReadRedis = ReadRedis;
//# sourceMappingURL=redisService.js.map