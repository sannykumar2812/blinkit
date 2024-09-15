import { Customer, DeliveryPartner } from "../../models/users.js";
const updateUser = async (req, reply) => {
    try {
        const { userId } = req.user;
        const updatedData = req.body;
        let user = await Customer.findById(userId) || await DeliveryPartner.findById(userId);
        if (!user) {
            return reply.code(404).send({ message: 'User not found' })
        }
        let userModel;
        if (user.role === 'Customer') {
            userModel = Customer
        }
        else if (user.role === 'DeliveryPartner') {
            userModel = DeliveryPartner
        }
        else {
            return reply.code(400).send({ message: 'Invalid User Role' })
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: updatedData }, { new: true, runValidators: true });
        if (!updatedUser) {
            return reply.code(404).send({ message: 'User not found' })
        }
        return reply.send({ message: 'User Updated', user: updatedUser })


    } catch (err) {
        return reply.code(500).send({ message: 'Failed to update user', err })
    }
}

export {
    updateUser
}