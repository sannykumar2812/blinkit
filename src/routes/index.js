import { authRoutes } from "./auth/auth.js";
import { orderRoutes } from "./order/order.js";
import { categoriesRoutes, productsRoutes } from "./product/product.js";

const prefix = '/api/v1';

const registerRoutes = async (fastify) => {
    fastify.register(authRoutes, { prefix: prefix })
    fastify.register(categoriesRoutes, { prefix: prefix })
    fastify.register(productsRoutes, { prefix: prefix })
    fastify.register(orderRoutes, { prefix: prefix })
}

export {
    registerRoutes
}