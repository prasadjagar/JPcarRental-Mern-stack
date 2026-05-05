import express from 'express';
import { protect } from '../middleware/auth.js';
import { changeRoleToOwner, addCar, getOwnerCars, deleteCar, toggleCarAvaliability, getDashboardData, updateUserImage } from '../controllers/ownerControllers.js';
import upload from '../middleware/multer.js';
const ownerRoutes = express.Router();

// Example protected route for owners
ownerRoutes.post('/change-role', protect, changeRoleToOwner); 
ownerRoutes.post('/add-car',upload.single("image"), protect, addCar); 
ownerRoutes.get('/cars', protect, getOwnerCars); 
ownerRoutes.get('/toggle-car', protect, toggleCarAvaliability); 
ownerRoutes.post('/delete-car', protect, deleteCar); 
ownerRoutes.get('/dashboard', protect, getDashboardData); 
ownerRoutes.post('/update-image', upload.single("image"),protect, updateUserImage);

export default ownerRoutes;