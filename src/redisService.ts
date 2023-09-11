/* eslint-disable no-inline-comments */
import type { RedisClientType } from 'redis'
import { createClient } from 'redis'
import { isRestParameter } from 'typescript'
//import { config } from '@app/config'
//import { logger } from '@app/utils/logger'

let redisClient: RedisClientType
let isReady: boolean

const urlRedis = process.env.REDIS_URL
const cacheOptions = {url:urlRedis,}

Object.assign(cacheOptions, {
    socket: {
      // keepAlive: 300, // 5 minutes DEFAULT
      tls: false,
    },
});


async function getCache(): Promise<RedisClientType> {
  if (!isReady) {
    redisClient = createClient({
      ...cacheOptions,
    })
    redisClient.on('error', err => console.log(`Redis Error: ${err}`))
    redisClient.on('connect', () => console.log('Redis connected'))
    redisClient.on('reconnecting', () => console.log('Redis reconnecting'))
    redisClient.on('ready', () => {
      isReady = true;
      console.log('Redis ready!')
    })
    await redisClient.connect()
  }
  return redisClient
}
/*
getCache().then(connection => {
  redisClient = connection
}).catch(err => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.log({ err }, 'Failed to connect to Redis');
})
*/
export {
  getCache,
}

export const WriteRedis =async(key:string, data: string ) =>{
    const cache = await getCache();
    // await cache.setEx(1, 60, JSON.stringify('account'))
    //const resultx =await cache.set (key,data);
    
    const result =await cache.set(key,data);
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
};

export const ReadRedis =async(key:string) =>{
    const cache = await getCache();
   // await cache.setEx(1, 60, JSON.stringify('account'))
   const result =await cache.get(key);
   //  const result =await cache.set(key,data);
    // const resultx =await cache.hSet('', 60, JSON.stringify(modelTarjeta))
     return result;
 };
 