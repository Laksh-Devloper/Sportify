import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js'; // Only import once here
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating random order IDs

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { productId, name, price, img } = req.body;

        if (!productId || !name || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (price <= 0) {
            return res.status(400).json({ message: 'Invalid price' });
        }

        const existingItem = user.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                productId,
                name,
                price,
                quantity: 1,
                img
            });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update cart item quantity
router.put('/update/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { productId } = req.params;
        const { quantity } = req.body;

        if (typeof quantity !== 'number') {
            return res.status(400).json({ message: 'Quantity must be a number' });
        }

        const cartItem = user.cart.find(item => item.productId === productId);
        
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            user.cart = user.cart.filter(item => item.productId !== productId);
        } else {
            cartItem.quantity = quantity;
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Remove item from cart
router.delete('/remove/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { productId } = req.params;
        const initialLength = user.cart.length;
        user.cart = user.cart.filter(item => item.productId !== productId);
        
        if (user.cart.length === initialLength) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Checkout endpoint
router.post('/checkout', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const stripe = await import('stripe');
        const stripeInstance = stripe.default(process.env.STRIPE_SECRET_KEY);

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: user.cart.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: item.img && isValidHttpUrl(item.img) ? [item.img] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        // Save order details to MongoDB
        const orderId = uuidv4(); // Generate a random order ID
        const totalPrice = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        const order = new Order({
            name: user.fullName,
            email: user.email,
            products: user.cart,
            totalPrice,
            orderId,
        });

        await order.save(); // Save the order to the database
        user.orders.push(order);
        await user.save();
        // Clear the cart after successful checkout session creation
        user.cart = [];
        await user.save();

        res.json({ id: session.id });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ 
            message: 'Checkout failed', 
            error: error.message 
        });
    }
});

// Helper function to validate URLs
function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        return false;
    }
}

export default router;
