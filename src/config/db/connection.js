import 'dotenv/config'
import mongoose from 'mongoose'
import { DB } from '../db/index.js'
export const connectDB = async () => {
    try {
        await mongoose.connect(DB.URI);
        console.log('Mongodb connected Successfully...!!!');
    } catch (err) {
        console.log(err, '<---catch Errr')
        console.error(err.message, 'ERR-MESSAGE');

    }
};


// MONGO_URI = "mongodb+srv://sunnykusingh2812:yO2vHuks99ykztpB@blinkit.m1q4r.mongodb.net/blinkit?retryWrites=true&w=majority&appName=BlinkIt"
// PORT = 3001
// COOKIE_PASSWORD = sirsefekASHKLADH124FSdhskjd12jkr3
// NODE_ENV = ''
// # DB_HOST = "localhost"
// # DB_NAME = "blinkit"
// # DB_PORT = 5432
// # DB_USER = 'postgres'
// # DIALECT = 'postgres'
// # DB_PASSWORD = 'Sunny@123'


