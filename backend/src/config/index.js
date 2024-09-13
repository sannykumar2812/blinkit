const DB = {
    HOST: process.env.DB_HOST,
    POST: process.env.DB_PORT,
    DATABASE: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: process.env.DIALECT,
    URI: process.env.MONGO_URI
};

module.exports = { DB };