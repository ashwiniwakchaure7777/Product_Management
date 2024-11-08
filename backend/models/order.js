// backend/models/order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, // Ensure productId is mandatory
  },
  orderType: {
    type: String,
    enum: ['Home Delivery', 'Self pick-up'],
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  productdiscount: {
    type: Number,
    default: 0,
  },
  orderTotalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'returned', 'canceled','damaged'],
    default: 'pending',
  },
});

export const Order = mongoose.model('Order', orderSchema);

