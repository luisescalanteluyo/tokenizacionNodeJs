import {Request,Response,NextFunction, json} from 'express';
import Tarjeta from '../models/tarjeta';
import RedisTarjeta from '../models/redisTarjeta';
import Tarjetax from '../repositories/tarjeta';

import { WriteRedis,ReadRedis, getCache } from '../redisService';

import jwt,{SignOptions,Secret }  from 'jsonwebtoken';

//const SECRET_KEY = process.env.TOKEN_SECRET;
const SECRET_KEY: Secret = ''+process.env.TOKEN_SECRET?.toString();
console.log ("SECRET_KEY:",SECRET_KEY);
  
const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
   // algorithm: 'RS256',
    expiresIn: '1m'
  };


export const booktest= async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // console.log (result);

        const modelTarjeta=  new Tarjeta();
        modelTarjeta.Card_number=req.body.card_number;
        modelTarjeta.Cvv=req.body.cvv;
       // const result =await  (await Tarjetax()).save(req.body);

       
      // const cache = await getCache()
      // const resultx =await cache.hSet('Tarjetahset', 60, JSON.stringify(modelTarjeta))

        const result =await WriteRedis('Tarjetax',JSON.stringify(modelTarjeta));    
        console.log (req.body);
    

        return res.send({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
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
        //,
        //name: modelTarjeta.email,
        //userId: modelTarjeta.card_number
      };

    try {
        
       // let TOKEN_SECRET = process.env.TOKEN_SECRET;
        console.log (SECRET_KEY);
  
       // const result =await WriteRedis('Tarjeta',modelTarjeta);    
    
       // sign({_id: modelTarjeta.card_number}, TOKEN_SECRET || '' , { expiresIn: '2 days',  });

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

};

export const singup =(req:Request,res:Response) =>{
   
    console.log (req.body);
    res.send('singin');

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
    

       // console.log(tokenModel.data.Card_number.toString());
       const redisResponse =await ReadRedis(tokenModel.data.Card_number.toString());   
      /* console.log (redisResponse); 
      const sJsonRedisResponse= JSON.stringify(redisResponse);
      console.log (sJsonRedisResponse);
      const redisModel= JSON.parse(sJsonRedisResponse);*/

      const redisModel= JSON.parse(redisResponse||'')  as RedisTarjeta;
      console.log (redisModel);
      //console.log (redisModelx);
      
    // const ssss= redisModel.data;
       console.log (redisModel.token);
       console.log (redisModel.data);

      //const resultSEARCH = await (await Tarjetax()).fetch(req.params.id)
      //const resultSEARCH =  (await Tarjetax()).search();
 
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


