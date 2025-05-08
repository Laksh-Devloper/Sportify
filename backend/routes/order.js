import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET /api/orders - Fetch all orders for the logged-in user
router.get('/', async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(403).json({ message: 'Not authenticated' });
        }

        // Fetch orders belonging to the authenticated user
        const orders = await Order.find({ user: req.user.id } , 'products');

        // Send orders as a JSON response
        res.json(orders);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching orders.', details: error.message });
    }
});

export default router;
