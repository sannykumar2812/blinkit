import jwt from 'jsonwebtoken'
import { DEFAULT } from '../config/db/index.js'

export const verifyToken = async (req, reply) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({ message: 'Access Token required' })
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, DEFAULT.ACCESS_TOKEN)
        req.user = decoded;
        return true

    } catch (err) {
        return reply.code(403).send({ message: 'Invalid or Expired Token' })
    }
}