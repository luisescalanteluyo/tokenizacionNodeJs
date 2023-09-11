console.log("************ index.ts main ini*************");

import 'dotenv/config'

//import * as dotenv from "dotenv";
//console.log("__dirname: ",__dirname);
//dotenv.config({ path: 'D:\LUIS\Tokenizacion'+'/.env' });

 const PORT  = process.env.PORT; 
// console.log("PORT: ",PORT);
// const REDIS_URL  = process.env.REDIS_URL;
// console.log("REDIS_URL: ",REDIS_URL);

import app from './app';
//import RedisClient  from './connectionRedis';
import {getCache }  from './redisService';

//import aas  from './';

//import { createClient } from 'redis';
//import { Client } from 'redis-om'

//getCache();

 async function  main(){
   // app.listen(app.get('port'));
    app.listen(PORT);
    await getCache();

    //  const sss= await getCache();

    //await RedisClient();

  //  const client = new Client()
    //const redisConn =  client.open('redis://localhost:6379')
    //console.log("server on port: ",app.get('port'));

    console.log("server on port: "+PORT);
    console.log("************ index.ts main fin*************");

}

main();

