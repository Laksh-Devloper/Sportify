import mongoose from 'mongoose';

// Define the CartItem schema
const CartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  img: String,
});

// Define the Order schema (you can also import it from order.js if you prefer)
const OrderSchema = new mongoose.Schema({
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  orderId: { type: String, required: true, unique: true },
}, { timestamps: true });

// Define the User schema
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  cart: [CartItemSchema],
  orders: [OrderSchema] // Add orders field to store user's orders
});

// Export the User model
export default mongoose.model('User', UserSchema);