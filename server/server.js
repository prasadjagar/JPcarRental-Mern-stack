import express from 'express';
import "dotenv/config";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import connectDB from './configs/db.js';
import ownerRoutes from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// Initialize Express app
const app = express();

// Connect to MongoDB
await connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.get('/', (req,res)=> res.send('server is running'));
app.use('/api/users',userRoutes)
app.use('/api/owners',ownerRoutes)
app.use('/api/bookings', bookingRouter)
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
}

export default app;
