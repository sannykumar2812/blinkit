import { confirmOrder, createOrder, getOrders, getOrdersbyId, updateOrderStatus } from "../../controller/order/order.js"
import { verifyToken } from "../../middleware/auth.js"


const orderRoutes = async (fastify, options) => {
    fastify.addHook('preHandler', async (req, reply) => {
        const isAuthenticated = await verifyToken(req, reply)
        if (!isAuthenticated) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
    })
    fastify.post('/order', createOrder)
    fastify.get('/order/:orderId', getOrdersbyId)
    fastify.get('/order', getOrders)
    fastify.patch('/order/:orderId/status', updateOrderStatus)
    fastify.post('/order/:orderId/confirm', confirmOrder)

}
export {
    orderRoutes
}