import express from "express";
import {addNewProduct,getAllProducts,getProductDetails,createOrder} from "../controller/productController.js";

const router = express.Router();

router.post('/addProduct', addNewProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getproductdetails/:id',getProductDetails);
router.post('/createOrder',createOrder);


export default router;