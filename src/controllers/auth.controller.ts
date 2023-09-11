import {Request,Response,NextFunction, json} from 'express';
import Tarjeta from '../models/tarjeta';
import RedisTarjeta from '../models/redisTarjeta';

import { WriteRedis,ReadRedis, getCache } from '../redisService';

import jwt,{SignOptions,Secret }  from 'jsonwebtoken';

const SECRET_KEY: Secret = ''+process.env.TOKEN_SECRET?.toString();
console.log ("SECRET_KEY:",SECRET_KEY);
  
const signInOptions: SignOptions = {

    expiresIn: '1m'
  };


export const signin = async (req:Request,res:Response, next: NextFunction) =>{
    console.log('*****request signin********');
    console.log (req.body);
    
    const modelTarjeta = new Tarjeta();
    modelTarjeta.Card_number=req.body.card_number;
    modelTarjeta.Cvv=req.body.cvv;
    modelTarjeta.Email=req.body.email;
    modelTarjeta.Expiration_month=req.body.expiration_month;
    modelTarjeta.Expiration_year=req.body.expiration_year;
    
    const payload = {
        data:modelTarjeta
      };

    try {
        
        console.log (SECRET_KEY);
  
        const tokenJWT = jwt.sign(payload, SECRET_KEY, signInOptions);
        console.log (tokenJWT);
  
        const result =new RedisTarjeta();
        result.data=modelTarjeta;
        result.token=tokenJWT;

        const redisResponse =await WriteRedis(modelTarjeta.Card_number.toString(),JSON.stringify(result));    
        console.log ('redisResponse: '+redisResponse);
  
        return res.send({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }


};


export const verify = async(req:Request,res:Response, next: NextFunction) =>{

    try{

        //console.log (req.params);
        const token = req.header('Authorization')?.replace('Bearer ', '');
    
       // console.log (token);
       if (!token) {
         throw new Error();
       }

        const decoded = jwt.verify(token, SECRET_KEY);
        const sJson= JSON.stringify(decoded);
        const tokenModel= JSON.parse(sJson);//as Token;

        console.log(decoded);
    
        console.log(tokenModel);
        console.log(tokenModel.data);
        console.log('decoded: '+JSON.stringify(tokenModel));
    

       const redisResponse =await ReadRedis(tokenModel.data.Card_number.toString());   

      const redisModel= JSON.parse(redisResponse||'')  as RedisTarjeta;
      console.log (redisModel);
    
       console.log (redisModel.token);
       console.log (redisModel.data);

      if (token!=redisModel.token) {
        throw new Error('El token no se encuentra registrado en BD');
      }

      redisModel.data.Cvv=0;

      res.send(redisModel.data);
    } catch (err) {
       // console.log(err);
        res.status(401).send({error:"Key token expirado, vuelva a generarlo." });
      }
};


