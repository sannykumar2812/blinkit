import 'dotenv/config'
import Fastify from 'fastify'
import { connectDB } from './src/config/db/connection.js';
import { buildAdminRouter, admin } from './src/config/setup.js';
import { DEFAULT } from './src/config/db/index.js';
import { registerRoutes } from './src/routes/index.js';
import fastifySocketIO from 'fastify-socket.io'


const start = async () => {
    try {
        await connectDB()
        const app = Fastify()
        app.register(fastifySocketIO, {
            cors: {
                origin: '*',
            },
            pingInerval: 10000,
            pingTimeout: 5000,
            transport: ['websocket'],
        });
        await registerRoutes(app)
        await buildAdminRouter(app)
        app.listen({ port: DEFAULT.PORT || 3000 }, (err, address) => {
            if (err) {
                console.log(err, 'Error in starting the server');
            }
            else {
                console.log(`Server listening at http://localhost:${DEFAULT.PORT}${admin.options.rootPath} 🚀 `,);
            }
        })

        app.ready().then(() => {
            app.io.on('connection', (socket) => {
                console.log(' Established connection with socket ✅');
                socket.on("joinRoom", (orderId) => {
                    socket.join(orderId);
                    console.log("User joined room 🚀", orderId)
                })

                socket.on('disconnect', () => {
                    console.log("User disconnected ❌", socket.id);
                })
            })
        });
    } catch (err) {
        console.log(err, '<<--CatchError in starting the server');
    }
};

start();
