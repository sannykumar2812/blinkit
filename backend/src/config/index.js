const DB = {
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: process.env.DIALECT,
    URI: process.env.MONGO_URI
};

const DEFAULT = {
    PORT: process.env.DB_PORT,
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
}

module.exports = { DB, DEFAULT };