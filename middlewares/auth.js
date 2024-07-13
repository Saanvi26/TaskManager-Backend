import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please login in first"
            })

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //throws error if token is invalid ... handled by catch block here 
        req.user = await User.findById(decoded._id);
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

}
export { isAuthenticated }