import { DEFAULT } from "../../config/db/index.js";
import { Customer, DeliveryPartner } from "../../models/users.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, DEFAULT.ACCESS_TOKEN, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, DEFAULT.REFRESH_TOKEN, { expiresIn: "1d" });
    return { accessToken, refreshToken };

}


const loginCustomer = async (req, reply) => {
    try {
        const { phone } = req.body;
        let customer = await Customer.findOne({ phone });
        if (!customer) {
            customer = new Customer({ phone, role: 'Customer', isActivated: true });
            await customer.save();
        }
        const { accessToken, refreshToken } = generateToken(customer);
        return reply.send({
            message: customer ? "Login Successful" : "Customer created and logged in",
            accessToken,
            refreshToken,
            customer
        })
    } catch (err) {
        return reply.code(500).send({ message: 'An error occured', err })
    }
}


const loginDeliveryPartner = async (req, reply) => {
    try {
        const { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({ email });
        if (!deliveryPartner) {
            reply.code(404).send({ message: 'Delivery Partner not found', err })
        }
        const isMatch = password === deliveryPartner.password;
        if (!isMatch) {
            reply.code(400).send({ message: 'Invalid credentials', err })
        }
        const { accessToken, refreshToken } = generateToken(deliveryPartner);
        return reply.send({
            message: "Login Successful",
            accessToken,
            refreshToken,
            deliveryPartner
        })
    } catch (err) {
        return reply.code(500).send({ message: 'An error occured', err })
    }
}

const refreshToken = async (req, reply) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return reply.code(401).send({ message: 'Refresh token required' })
    }
    try {
        const decoded = jwt.verify(refreshToken, DEFAULT.REFRESH_TOKEN);
        let user;
        if (decoded.role === 'Customer') {
            user = await Customer.findById(decoded.userId);
        } else if (decoded.role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(decoded.userId);
        }
        else {
            return reply.code(403).send({ message: 'Invalid Role' })
        }
        if (!user) {
            return reply.code(403).send({ message: 'Invalid or Expired Refresh Token' })
        }
        const { accessToken, refreshToken: newRefreshToken } = generateToken(user);
        return reply.send({
            message: 'Refresh Token Updated',
            accessToken,
            refreshToken: newRefreshToken
        })
    } catch (err) {
        return reply.code(403).send({ message: 'Invalid or Expired  Refresh Token' })
    }
}

const fetchUser = async (req, reply) => {
    try {
        const { userId, role } = req.user;

        let user
        if (role === 'Customer') {
            user = await Customer.findById(userId);
        } else if (role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(userId);
        }
        else {
            return reply.code(403).send({ message: 'Invalid Role' })
        }
        if (!user) {
            return reply.code(403).send({ message: 'Invalid or Expired Refresh Token' })
        }
        return reply.send({
            message: 'User fetched successfully',
            user
        })
    } catch (err) {
        return reply.code(500).send({ message: 'An error occured', err })
    }
}


export {
    loginCustomer,
    loginDeliveryPartner,
    refreshToken,
    fetchUser
}