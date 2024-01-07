import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }

    const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
                error: error.message,
                token: token
            });
        }
        req.user = user;
        next();
    });
};
