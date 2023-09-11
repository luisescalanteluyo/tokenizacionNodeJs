
console.log("************ app.ts main ini*************");

import express, {Application} from 'express';
import authRoutes from './routes/auth';
import morgan from 'morgan';

//import dotenv from 'dotenv';
//dotenv.config();


const app: Application = express();
//const PORT =  process.env.PORT_API

//settinng
//app.set('port',PORT);


//middlewares
app. use(morgan('dev'))
app. use(express.json())

//routs
app.use('/api',authRoutes)

export default app;


console.log("************ app.ts main fin*************");
