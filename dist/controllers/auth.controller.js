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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.singup = exports.signin = exports.booktest = void 0;
const tarjeta_1 = __importDefault(require("../models/tarjeta"));
const redisTarjeta_1 = __importDefault(require("../models/redisTarjeta"));
const redisService_1 = require("../redisService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const SECRET_KEY = process.env.TOKEN_SECRET;
const SECRET_KEY = '' + ((_a = process.env.TOKEN_SECRET) === null || _a === void 0 ? void 0 : _a.toString());
console.log("SECRET_KEY:", SECRET_KEY);
const signInOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    // algorithm: 'RS256',
    expiresIn: '1m'
};
const booktest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log (result);
        const modelTarjeta = new tarjeta_1.default();
        modelTarjeta.Card_number = req.body.card_number;
        modelTarjeta.Cvv = req.body.cvv;
        // const result =await  (await Tarjetax()).save(req.body);
        // const cache = await getCache()
        // const resultx =await cache.hSet('Tarjetahset', 60, JSON.stringify(modelTarjeta))
        const result = yield (0, redisService_1.WriteRedis)('Tarjetax', JSON.stringify(modelTarjeta));
        console.log(req.body);
        return res.send({
            status: 'success',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booktest = booktest;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('*****request signin********');
    console.log(req.body);
    const modelTarjeta = new tarjeta_1.default();
    modelTarjeta.Card_number = req.body.card_number;
    modelTarjeta.Cvv = req.body.cvv;
    modelTarjeta.Email = req.body.email;
    modelTarjeta.Expiration_month = req.body.expiration_month;
    modelTarjeta.Expiration_year = req.body.expiration_year;
    const payload = {
        data: modelTarjeta
        //,
        //name: modelTarjeta.email,
        //userId: modelTarjeta.card_number
    };
    try {
        // let TOKEN_SECRET = process.env.TOKEN_SECRET;
        console.log(SECRET_KEY);
        // const result =await WriteRedis('Tarjeta',modelTarjeta);    
        // sign({_id: modelTarjeta.card_number}, TOKEN_SECRET || '' , { expiresIn: '2 days',  });
        const tokenJWT = jsonwebtoken_1.default.sign(payload, SECRET_KEY, signInOptions);
        console.log(tokenJWT);
        const result = new redisTarjeta_1.default();
        result.data = modelTarjeta;
        result.token = tokenJWT;
        const redisResponse = yield (0, redisService_1.WriteRedis)(modelTarjeta.Card_number.toString(), JSON.stringify(result));
        console.log('redisResponse: ' + redisResponse);
        return res.send({
            status: 'success',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
    /*
 const xx=  new Tarjeta({
        card_number: 0,
        cvv: 0,
        expiration_month: "",
        expiration_year: "",
        email:""
    });*/
    // console.log (modelTarjeta);
    // res.send('singup');
});
exports.signin = signin;
const singup = (req, res) => {
    console.log(req.body);
    res.send('singin');
};
exports.singup = singup;
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        //console.log (req.params);
        const token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
        // console.log (token);
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const sJson = JSON.stringify(decoded);
        const tokenModel = JSON.parse(sJson); //as Token;
        console.log(decoded);
        console.log(tokenModel);
        console.log(tokenModel.data);
        console.log('decoded: ' + JSON.stringify(tokenModel));
        // console.log(tokenModel.data.Card_number.toString());
        const redisResponse = yield (0, redisService_1.ReadRedis)(tokenModel.data.Card_number.toString());
        /* console.log (redisResponse);
        const sJsonRedisResponse= JSON.stringify(redisResponse);
        console.log (sJsonRedisResponse);
        const redisModel= JSON.parse(sJsonRedisResponse);*/
        const redisModel = JSON.parse(redisResponse || '');
        console.log(redisModel);
        //console.log (redisModelx);
        // const ssss= redisModel.data;
        console.log(redisModel.token);
        console.log(redisModel.data);
        //const resultSEARCH = await (await Tarjetax()).fetch(req.params.id)
        //const resultSEARCH =  (await Tarjetax()).search();
        if (token != redisModel.token) {
            throw new Error('El token no se encuentra registrado en BD');
        }
        redisModel.data.Cvv = 0;
        res.send(redisModel.data);
    }
    catch (err) {
        // console.log(err);
        res.status(401).send({ error: "Key token expirado, vuelva a generarlo." });
    }
});
exports.verify = verify;
//# sourceMappingURL=auth.controller.js.map