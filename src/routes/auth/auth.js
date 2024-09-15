import { fetchUser, loginCustomer, loginDeliveryPartner, refreshToken } from "../../controller/auth/auth.js"
import { updateUser } from "../../controller/tracking/user.js"
import { verifyToken } from "../../middleware/auth.js"

const authRoutes = async (fastify, options) => {
    fastify.post('/customer/login', loginCustomer)
    fastify.post('/delivery/login', loginDeliveryPartner)
    fastify.post('/refresh-token', refreshToken)
    fastify.get('/user', { preHandler: [verifyToken] }, fetchUser)
    fastify.patch('/user', { preHandler: [verifyToken] }, updateUser)
}
export {
    authRoutes
}