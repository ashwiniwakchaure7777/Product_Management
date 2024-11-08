import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import {Order} from './order.js';

const AutoIncrement = mongooseSequence(mongoose);

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true, // Make sure productId is unique
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productCategory: {
    type: String,
    enum: ["Gadgets", "Fashion", "Books", "Furniture", "Toys", "Beauty"], // Add categories as needed
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  costPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityInStock: {
    type: Number,
    default: 0,
    min: 0,
  },
  orderType: {
    type: String,
    enum: ["Home Delivery", "Self Pick-up"], // Dropdown options for order type
    required: true,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  expiryDate: {
    type: Boolean,
    default: false,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxLength: 150,
  },
  longDescription: {
    type: String,
    trim: true,
  },
  returnPolicy: {
    type: String,
    trim: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  mainImage: {
    public_id: String,
    url: String,
  },
  additionalImages: [
    {
      type: String, // Array of URLs from Cloudinary
    },
  ],

  // Dashboard Metrics
  views: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
  orderStatuses: {
    completed: {
      type: Number,
      default: 0,
    },
    cancelled: {
      type: Number,
      default: 0,
    },
    returned: {
      type: Number,
      default: 0,
    },
    damaged: {
      type: Number,
      default: 0,
    },
  },
  allOrders: {
    type: Number,
    default: 0,
  },
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Referencing the Order model
    },
  ],

  publishedStatus: {
    type: String,
    enum: ["Published", "Unpublished"],
    default: "Published"  // Set to false by default, so the product is hidden until published
  },
});

productSchema.plugin(AutoIncrement, { inc_field: "productId" });
export const Product = mongoose.model("Product", productSchema);
