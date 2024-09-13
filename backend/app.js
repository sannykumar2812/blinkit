
require('dotenv').config();
const app = require('fastify')({ logger: true });
const connectDB = require('./src/config/db/connection');



const start = async () => {
    try {
        // await sequelize.sync({ force: true }); // Synchronize the models
        await connectDB()
        await app.listen({ port: process.env.PORT || 3000 });
    } catch (err) {
        console.log(err, 'Error in starting the server');
    }
};

start();
