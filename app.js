import 'dotenv/config'
import Fastify from 'fastify'
import { connectDB } from './src/config/db/connection.js';
import { buildAdminRouter, admin } from './src/config/setup.js';
import { DEFAULT } from './src/config/db/index.js';
import { registerRoutes } from './src/routes/index.js';


const start = async () => {
    try {
        await connectDB()
        const app = Fastify()
        await registerRoutes(app)
        await buildAdminRouter(app)
        app.listen({ port: DEFAULT.PORT || 3000 }, (err, address) => {
            if (err) {
                console.log(err, 'Error in starting the server');
            }
            else {
                console.log(`Server listening at  http://localhost:${DEFAULT.PORT}${admin.options.rootPath}`,);
            }
        })
    } catch (err) {
        console.log(err, '<<--CatchError in starting the server');
    }
};

start();
