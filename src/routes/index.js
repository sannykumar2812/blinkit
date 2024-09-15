import { authRoutes } from "./auth/auth.js";
import { categoriesRoutes, productsRoutes } from "./product/product.js";

const prefix = '/api/v1';

const registerRoutes = async (fastify) => {
    fastify.register(authRoutes, { prefix: prefix })
    fastify.register(categoriesRoutes, { prefix: prefix })
    fastify.register(productsRoutes, { prefix: prefix })
}

export {
    registerRoutes
}