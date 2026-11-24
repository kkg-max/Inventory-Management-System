// This file handles the business logic for creating a product.

const Product = require("../models/products.model");
const Counter = require("../models/counter.model");
const ApiError = require("../Utils/ApiError");
const mongoose = require("mongoose");


const createProduct = async (req, res, next) => {
    try {
        const { name, price, quantity, category, description } = req.body;

        // 1. Validate required fields
        if (
            typeof name !== "string" || !name.trim() ||
            price === undefined || price === null ||
            quantity === undefined || quantity === null ||
            typeof category !== "string" || !category.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid required fields"
            });
        }

        // 2. Validate price
        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        // 3. Validate quantity
        if (
            typeof quantity !== "number" ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a non-negative integer"
            });
        }

        // 4. Validate description
        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Description must be a string"
            });
        }

        // 5. Start MongoDB session
        const session = await mongoose.startSession();

        let product;
        let counter;

        try {
            // 6. Execute database operations in a transaction
            await session.withTransaction(async () => {

                // Create product
                product = new Product({
                    name: name.trim(),
                    price,
                    quantity,
                    category: category.trim(),
                    description
                });

                // Save product using transaction session
                await product.save({ session });

                // Update total product count
                counter = await Counter.findOneAndUpdate(
                    { _id: "productId" },
                    { $inc: { totalProducts: 1 } },
                    {
                        new: true,
                        upsert: true,
                        session
                    }
                );

            });

            // Transaction successfully committed
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
                totalProducts: counter.totalProducts
            });

        } finally {
            // Always close the session
            await session.endSession();
        }

    } catch (error) {
        next(error);
    }
};


const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        next(error);
    }
};

const productById = async (req, res, next) => {
    try {
        const { productId } = req.params; // Assuming the product ID is sent in the request parameters

        const product = await Product.findOne({ productId });

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};


const updateProductComplete = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const { name, price, quantity, category, description } = req.body;

        // 1. Validate required fields
        if (
            typeof name !== "string" || !name.trim() ||
            typeof category !== "string" || !category.trim() ||
            price === undefined || price === null ||
            quantity === undefined || quantity === null
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // 2. Validate price
        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        // 3. Validate quantity
        if (
            typeof quantity !== "number" ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a non-negative integer"
            });
        }

        // 4. Validate description
        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Description must be a string"
            });
        }

        // 5. Update product
        const product = await Product.findOneAndUpdate(
            { productId },
            {
                name: name.trim(),
                price,
                quantity,
                category: category.trim(),
                description: description ?? ""
            },
            {
                new: true,
                runValidators: true
            }
        );

        // 6. Check whether product exists
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        next(error);
    }
};



const updateSomeInfo = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const allowedFields = [
            "name",
            "price",
            "quantity",
            "category",
            "description"
        ];

        const updateData = {};

        // 1. Check whether the request body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update"
            });
        }

        // 2. Allow only permitted fields
        for (const key of Object.keys(req.body)) {
            if (!allowedFields.includes(key)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid field: ${key}`
                });
            }

            updateData[key] = req.body[key];
        }

        // 3. Validate individual fields
        if ("name" in updateData &&
            (typeof updateData.name !== "string" ||
                !updateData.name.trim())) {
            return res.status(400).json({
                success: false,
                message: "Name must be a non-empty string"
            });
        }

        if ("price" in updateData &&
            (typeof updateData.price !== "number" ||
                !Number.isFinite(updateData.price) ||
                updateData.price <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        if ("quantity" in updateData &&
            (typeof updateData.quantity !== "number" ||
                !Number.isInteger(updateData.quantity) ||
                updateData.quantity < 0)) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a non-negative integer"
            });
        }

        if ("category" in updateData &&
            (typeof updateData.category !== "string" ||
                !updateData.category.trim())) {
            return res.status(400).json({
                success: false,
                message: "Category must be a non-empty string"
            });
        }

        if ("description" in updateData &&
            typeof updateData.description !== "string") {
            return res.status(400).json({
                success: false,
                message: "Description must be a string"
            });
        }

        // 4. Trim text fields
        if ("name" in updateData) {
            updateData.name = updateData.name.trim();
        }

        if ("category" in updateData) {
            updateData.category = updateData.category.trim();
        }

        if ("description" in updateData) {
            updateData.description = updateData.description.trim();
        }

        // 5. Update product
        const product = await Product.findOneAndUpdate(
            { productId },
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        next(error);
    }
};




const deleteAllProducts = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        let result;
        let counter;

        await session.withTransaction(async () => {

            // 1. Delete all products
            result = await Product.deleteMany({}).session(session);

            // 2. Reset current product count
            counter = await Counter.findOneAndUpdate(
                { _id: "productId" },
                { $set: { totalProducts: 0 } },
                {
                    new: true,
                    upsert: true,
                    session
                }
            );

        });

        // 3. Send response after successful commit
        res.status(200).json({
            success: true,
            message: "All products deleted successfully",
            deletedCount: result.deletedCount,
            totalProducts: counter.totalProducts
        });

    } catch (error) {
        next(error);
    } finally {
        await session.endSession();
    }
};




const deleteProductById = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        const { productId } = req.params;

        let product;
        let counter;

        await session.withTransaction(async () => {

            // 1. Find and delete product
            product = await Product.findOneAndDelete(
                { productId },
                { session }
            );

            // 2. Check if product exists
            if (!product) {
                throw new ApiError(404, "Product not found");
            }

            // 3. Decrease total product count
            counter = await Counter.findOneAndUpdate(
                {
                    _id: "productId",
                    totalProducts: { $gt: 0 }
                },
                {
                    $inc: { totalProducts: -1 }
                },
                {
                    new: true,
                    session
                }
            );

            if (!counter) {
                throw new ApiError(
                    500,
                    "Product counter is missing or inconsistent"
                );
            }

        });

        // 4. Send response after successful commit
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
            totalProducts: counter ? counter.totalProducts : 0
        });

    } catch (error) {
        next(error);
    } finally {
        await session.endSession();
    }
};



module.exports = { createProduct, getAllProducts, productById, updateProductComplete, updateSomeInfo, deleteAllProducts, deleteProductById };
