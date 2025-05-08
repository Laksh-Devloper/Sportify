import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  orderId: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
