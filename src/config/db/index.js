
export const DB = {
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: process.env.DIALECT,
    URI: process.env.MONGO_URI
};
export const DEFAULT = {
    PORT: process.env.PORT,
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
    NODE_ENV: process.env.NODE_ENV
}

