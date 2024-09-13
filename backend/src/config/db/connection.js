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



