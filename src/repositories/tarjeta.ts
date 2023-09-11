import { Entity, Schema } from 'redis-om';
import redisClient  from '../connectionRedis'

//class Book extends Entity {}



const tarjeta = new Schema('tarjeta', {
    card_number: { type: 'number' },
    cvv: { type: 'number' }
  },{
    dataStructure: 'HASH'
  }
  );

const setup = async () => {
    const bookRepo = (await redisClient()).fetchRepository(tarjeta)
    //await bookRepo.createIndex()
    
   // const bookRepo = (await redisClient()).fetchRepository(tarjeta)
   // const bookRepo = (await redisClient()).hsetall('','');
    
    return bookRepo;
}

export default setup;