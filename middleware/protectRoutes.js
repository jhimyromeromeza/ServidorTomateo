import jwt from "jsonwebtoken";
import User from "../models/auth.models.js"

export const protectRoutes = (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({valid: false, error: 'Unauthorized - No token provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
        if(error){
            return res.status(401).json({valid: false, error: 'token no authorized'});
        } 
        const userFound = await User.findById(user._id).select('-password');
        if(!userFound) return res.status(500).json({valid: false, error: 'User not Found'});
        req.user = userFound;
        next();
    } )
}
