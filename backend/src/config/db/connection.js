const mongoose = require('mongoose');
require('dotenv').config();
const { DB } = require('..');

const connectDB = async () => {
    try {
        await mongoose.connect(DB.URI);
        console.log('Mongodb connected Successfully...!!!');
    } catch (err) {
        console.log(err, '<---catch Errr')
        console.error(err.message, 'ERR-MESSAGE');

    }
};

module.exports = connectDB;

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
//     host: DB.HOST,
//     dialect: DB.DIALECT,
//     logging: false,      // Disable SQL query logging
// });

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to PostgreSQL has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

// module.exports = sequelize;

