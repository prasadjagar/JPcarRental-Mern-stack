import express from 'express';
import {getCars, loginUser, registerUser } from '../controllers/userControllers.js';
import { protect } from '../middleware/auth.js';
import { getUserData } from '../controllers/userControllers.js';

const userRoutes = express.Router();
userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
userRoutes.get('/data', protect, getUserData);
userRoutes.get('/cars', getCars);

export default userRoutes;