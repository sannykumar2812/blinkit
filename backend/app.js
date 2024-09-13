
require('dotenv').config();
const app = require('fastify')({ logger: true });
const { DEFAULT } = require('./src/config');
const connectDB = require('./src/config/db/connection');
// const { buildAdminRouter } = require('./src/config/setup');


const start = async () => {
    try {
        // await buildAdminRouter(app)

        // await sequelize.sync({ force: true }); // Synchronize the models
        await connectDB()
        await app.listen({ port: DEFAULT.PORT || 3000 });
    } catch (err) {
        console.log(err, 'Error in starting the server');
    }
};

start();
