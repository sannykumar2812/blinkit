import 'dotenv/config'
import Fastify from 'fastify'
import { connectDB } from './src/config/db/connection.js';
import { buildAdminRouter } from './src/config/setup.js';


const start = async () => {
    try {
        const app = Fastify()
        await buildAdminRouter(app)
        await connectDB()
        await app.listen({ port: process.env.PORT || 3000 }, (err, address) => {
            if (err) {
                console.log(err, 'Error in starting the server');
            }
            else {
                console.log(`Server listening at PORT ${process.env.PORT}`);
            }
        })
    } catch (err) {
        console.log(err, '<<--CatchError in starting the server');
    }
};

start();
