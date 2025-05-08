// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import paymentRoutes from './routes/payment.js';
import cartRoutes from './routes/cart.js';
import User from './models/User.js';
import ordersRouter from './routes/order.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow multiple origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow credentials (like cookies) to be sent with requests
}));

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Register Route
app.post('/api/auth/register', async (req, res) => {
    const { fullName, email, address ,password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with empty cart
        user = new User({ 
            fullName, 
            email, 
            address,
            password: hashedPassword,
            cart: [] 
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create and return JWT
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route to fetch user data using the JWT token
app.get('/api/auth/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ 
            fullName: user.fullName,
            email: user.email,
            cart: user.cart ,
            address : user.address,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send('Invalid Token');
    }
});

// Route to update user address
app.put('/api/auth/user/address', verifyToken ,  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      user.address = req.body.address;
      await user.save();
      res.send({ address: user.address });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update user address.' });
    }
  });

// Apply verifyToken middleware to protected routes
app.use('/api/payment', verifyToken, paymentRoutes);
app.use('/api/cart', verifyToken, cartRoutes);
app.use('/api/orders', verifyToken , ordersRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
