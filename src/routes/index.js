import { authRoutes } from "./auth/auth.js";

const prefix = '/api/v1';

const registerRoutes = async (fastify) => {
    fastify.register(authRoutes, { prefix: prefix })
}

export {
    registerRoutes
}