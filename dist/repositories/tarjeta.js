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
const redis_om_1 = require("redis-om");
const connectionRedis_1 = __importDefault(require("../connectionRedis"));
//class Book extends Entity {}
const tarjeta = new redis_om_1.Schema('tarjeta', {
    card_number: { type: 'number' },
    cvv: { type: 'number' }
}, {
    dataStructure: 'HASH'
});
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepo = (yield (0, connectionRedis_1.default)()).fetchRepository(tarjeta);
    //await bookRepo.createIndex()
    // const bookRepo = (await redisClient()).fetchRepository(tarjeta)
    // const bookRepo = (await redisClient()).hsetall('','');
    return bookRepo;
});
exports.default = setup;
//# sourceMappingURL=tarjeta.js.map