// require('dotenv').config();
import 'dotenv/config'
import fastifySession from '@fastify/session';
import connectMongodbSession from 'connect-mongodb-session';
// import { DB } from './db';
// import { Admin } from './models';
// import { DB, DEFAULT } from '.'

const MongoDBStore = connectMongodbSession(fastifySession);

export const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7
})

sessionStore.on('error', (err) => {
    console.log(err, 'Session Store error');
})

export const authenticate = async (email, password) => {

    if (email === 'sunnykusingh2812@gmail.com' && password === '123456') {
        return Promise.resolve({ email: email, password: password })
    } else {
        return null
    }
}
