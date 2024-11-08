import catchAsyncError from '../middleware/catchAsyncError.js'; 
import cloudinary from "cloudinary";
import {Product} from '../models/product.js'; 
import { Order } from "../models/order.js";
import mongoose from "mongoose";

// Add new product with images
export const addNewProduct = catchAsyncError(async (req, res, next) => {
  if (!req.files || !req.files.mainImage) {
    return res.status(400).json({ message: "Product images are required!" });
  }

  const { mainImage, additionalImages } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];

  // Ensure additionalImages is an array
  const additionalImagesArray = Array.isArray(additionalImages) ? additionalImages : additionalImages ? [additionalImages] : [];

  // Validate image formats
  if (![mainImage, ...additionalImagesArray].every(file => allowedFormats.includes(file.mimetype))) {
    return res.status(400).json({ message: "Only image files (png, jpeg, jpg) are allowed!" });
  }

  const { productName, productCategory, sellingPrice, costPrice, quantityInStock, orderType, publishedStatus } = req.body;

  // Set default value for 'publishedStatus' if it's not provided
  const status = publishedStatus || "Published"; // Default to "Published" if not provided

  if (!productName || !productCategory || !sellingPrice || !costPrice || !quantityInStock || !orderType) {
    return res.status(400).json({ message: "Please provide all required fields!" });
  }

  // Check if the product already exists
  const existingProduct = await Product.findOne({ productName });
  if (existingProduct) {
    return next(new ErrorHandler(`Product with name "${productName}" already exists!`));
  }

  // Upload main image to Cloudinary
  const mainImageUpload = await cloudinary.uploader.upload(mainImage.tempFilePath, { folder: 'product_images' });

  // Upload additional images to Cloudinary if any
  const additionalImagesUpload = additionalImagesArray.length > 0 ? await Promise.all(
    additionalImagesArray.map(image =>
      cloudinary.uploader.upload(image.tempFilePath, { folder: 'product_images' })
    )
  ) : [];

  // Create new product
  const newProduct = await Product.create({
    productName,
    productCategory,
    sellingPrice,
    costPrice,
    quantityInStock,
    orderType,
    publishedStatus: status, // Use the default or provided value for publishedStatus
    mainImage: {
      public_id: mainImageUpload.public_id,
      url: mainImageUpload.secure_url,
    },
    additionalImages: additionalImagesUpload.map(image => ({
      public_id: image.public_id,
      url: image.secure_url,
    })),
  });

  // Send success response
  res.status(201).json({
    success: true,
    message: "Product added successfully!",
    product: newProduct,
  });
});



// Get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// Get product details and dashboard data
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  try {
  
    // Fetch the product by ID
    const product = await Product.findById({_id:req.params.id});

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prepare dashboard data
    const dashboardData = {
      productName: product.productName,
      productCategory: product.productCategory,
      totalOrders: product.totalOrders || 0, // Assuming totalOrders are pre-calculated or need to be dynamically calculated
      inStock: product.quantityInStock > 0,
      views: product.views || 0,
      favoriteCount: product.favoriteCount || 0,
      orderStatuses: product.orderStatuses || [], // Assuming orderStatuses are stored in an array
      purchases: product.purchases || [], // Assuming purchases is an array of order details
    };

    res.status(200).json({ product });
  } catch (err) {
    console.error('Error fetching product dashboard:', err);
    res.status(500).json({ message: 'Error fetching product dashboard', error: err.message });
  }
});

// Controller function to create a new order
export const createOrder = async (req, res) => {
  try {
    const { orderDate, orderType, productId, qty, discount = 0, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const unitPrice = product.sellingPrice;
    if (!qty || isNaN(qty)) {
      return res.status(400).json({
        success: false,
        message: "Quantity (qty) must be a valid number",
      });
    }

    const orderTotalPrice = unitPrice * qty * (1 - discount / 100);
    if (isNaN(orderTotalPrice)) {
      return res.status(400).json({
        success: false,
        message: "Order total price calculation failed",
      });
    }

    const newOrder = new Order({
      productId, // Add productId to the order
      orderDate,
      orderType,
      unitPrice,
      qty,
      discount,
      orderTotalPrice,
      status,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};