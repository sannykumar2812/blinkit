
require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./src/config/sequlize/connection');


const start = async () => {
    try {
        await sequelize.sync({ force: true }); // Synchronize the models
        await fastify.listen({ port: process.env.PORT || 3000 });
    } catch (err) {
        console.log(err, 'Error in starting the server');
    }
};

start();
