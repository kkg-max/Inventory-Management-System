// This file defines the API endpoint.

const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    productById,
    updateProductComplete,
    updateSomeInfo,
    deleteAllProducts,
    deleteProductById
} = require("../Controllers/products.controller");

router.post("/post", createProduct);
router.get("/allProducts", getAllProducts);
router.get("/productbyId/:productId", productById);
router.put("/updateProductComplete/:productId", updateProductComplete);
router.patch("/updateSomeInfo/:productId", updateSomeInfo);   
router.delete("/deleteAll", deleteAllProducts);
router.delete("/deleteProductById/:productId", deleteProductById);

module.exports = router;
