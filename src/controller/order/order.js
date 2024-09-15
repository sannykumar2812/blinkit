import { Branch } from "../../models/branch.js"
import { Order } from "../../models/order.js"
import { Customer, DeliveryPartner } from "../../models/users.js"

const createOrder = async (req, reply) => {
    try {
        const { userId } = req.user
        const { items, branch, totalPrice } = req.body
        const customerData = await Customer.findById(userId)
        const branchData = await Branch.findById(branch)
        if (!customerData || !branchData) {
            return res.status(404).send({ message: 'Customer or Branch not found' })
        }
        const newOrder = new Order({
            customer: customerData._id,
            items: items.map(item => ({
                id: item.id,
                item: item.item,
                count: item.count
            })),
            branch,
            totalPrice,
            deliveryLocation: {
                latitude: customerData['Live location'].latitude,
                longitude: customerData['Live location'].longitude,
                address: customerData.address
            },
            pickupLocation: {
                latitude: branchData.livelocation.latitude,
                longitude: branchData.livelocation.longitude,
                address: branchData.address
            },

        })
        const savedOrder = await newOrder.save()
        return reply.send({ message: 'Order Created', order: savedOrder })
    } catch (err) {
        return res.status(500).send({ message: 'Failed to create order', err })
    }
}
const confirmOrder = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { userId } = req.user
        const { deliveryPersonLocation } = req.body


        const deliveryPerson = await DeliveryPartner.findById(userId)
        if (!deliveryPerson) {
            return reply.status(404).send({ message: 'Delivery Person not found' })
        }

        const order = await Order.findById(orderId)

        if (!order) return reply.status(404).send({ message: 'Order not found' })
        if (order.status !== 'available') return reply.status(400).send({ message: 'Order is not available' })
        order.status = 'confirmed'
        order.deliveryPerson = userId
        order.deliveryPersonLocation = {
            latitude: deliveryPersonLocation?.latitude,
            longitude: deliveryPersonLocation?.longitude,
            address: deliveryPersonLocation?.address
        }
        await order.save()
        return reply.send({ message: 'Order confirmed', order })
    } catch (err) {
        console.log(err)
        return reply.status(500).send({ message: 'Failed to confirm order', err })
    }

}

const updateOrderStatus = async (req, reply) => {
    try {
        const { orderId } = req.params
        const { status, deliveryPersonLocation } = req.body
        const order = await Order.findById(orderId)
        const { userId } = req.user
        const deliveryPerson = await DeliveryPartner.findById(userId)
        if (!deliveryPerson) return reply.status(404).send({ message: 'Delivery Person not found' })

        if (!order) return reply.status(404).send({ message: 'Order not found' })
        if (['cancelled', 'delivered'].includes(order.status)) return reply.status(400).send({ message: 'Order cannot be updated' })

        if (order.deliveryPartner?.toString() !== userId) return reply.status(403).send({ message: 'Unauthorized' })
        order.status = status
        order.deliveryPersonLocation = deliveryPersonLocation
        await order.save()
        return reply.send({ message: 'Order updated', order })
    } catch (err) {
        return reply.status(500).send({ message: 'Failed to update order status', err })
    }

}


const getOrders = async (req, reply) => {
    try {
        const { status, customerId, deliveryPartnerId, branchId } = req.query
        let query = {}
        if (status) {
            query.status = status
        }
        if (customerId) {
            query.customer = customerId
        }
        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId
            // query.branch = branchId
        }
        if (branchId) {
            query.branch = branchId
        }
        const orders = await Order.find(query).populate('customer deliveryPartner branch items.item')
        return reply.send({ message: 'Orders fetched', orders })
    } catch (err) {
        return reply.status(500).send({ message: 'Failed to get orders', err })
    }

}

const getOrdersbyId = async (req, reply) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId).populate('customer deliveryPartner branch items.item')
        if (!order) return reply.status(404).send({ message: 'Order not found' })
        return reply.send({ message: 'Order fetched', order })
    } catch (err) {
        return reply.status(500).send({ message: 'Failed to get orders', err })
    }

}



export {
    createOrder,
    confirmOrder,
    updateOrderStatus,
    getOrders,
    getOrdersbyId
}