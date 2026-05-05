import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async(req,res,next)=>{
     let token = req.headers.authorization;
     if(!token){
        return res.json({ success: false, message: 'No token provided' });
     }
     // Remove "Bearer " prefix if present
     if(token.startsWith('Bearer ')){
        token = token.slice(7);
     }
     try {
        const decoded = jwt.verify(token, process.env.jwt_SECRET);
        const userId = decoded.userId;
        if(!userId){
            return res.json({ success: false, message: 'Invalid token' });
        }
        const userData = await User.findById(userId).select('-password');
        if(!userData){
            return res.json({ success: false, message: 'User not found' });
        }
        req.user = userData;
        next();
     } catch (error) {
        console.log('Token verification error:', error.message);
        return res.status(401).json({ success: false, message: 'Token verification failed' });
     }
}