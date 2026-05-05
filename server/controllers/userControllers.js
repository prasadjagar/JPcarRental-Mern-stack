import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from '../models/Car.js';

//Generate JWT token
const generateToken=(userId)=>{
    const payload = { userId };
    return jwt.sign(payload, process.env.jwt_SECRET);
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check required fields and password length
        if (!name || !email || !password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields and ensure password is at least 8 characters long.'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(newUser._id.toString());

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        console.log('Error registering user:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Login user
export const loginUser = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email  })
        if(!user){
            return res.json({ success: false, message: 'user not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString());
        res.json({success:true,message:'User logged in successfully',token})
    } catch (error) {
        console.log('Error logging in user:', error.message);
        res.json({ success: false, message: error.message });
    }

}

//Get user data using token(JWT)
export const getUserData = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({ success: false, message: 'User not found in request' });
        }
        return res.json({ success: true, user });
    } catch (error) {
        console.log('Error fetching user data:', error.message);
        res.json({ success: false, message: error.message });
    }
}

//Get All Cars for the frontend
export const getCars = async(req,res)=>{
    try {
        const cars  = await Car.find({isAvaliable: true})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
