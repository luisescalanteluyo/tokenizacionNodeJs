//import 'dotenv/config'
import { Client } from 'redis-om'

export default async function() {
    console.log("************ connectionRedis.ts ini *************");

    const url = process.env.REDIS_URL
    console.log("connection redis= "+url);

    const client = new Client()
    const redisConn = await client.open(url);

    // to check for connection. you can delete it after we have confirmed our connection is successful
    //const dbCheck = await client.execute(['PING']);
    console.log("REDIS",redisConn)
    console.log("************ connectionRedis.ts fin *************");
    
    return redisConn
}
