
const express = require('express');
const cors = require('cors');
const productRoutes = require("./Routes/products.routes");
const errorMiddleware = require("./Middlewares/error.middleware");

const app = express();

// Normal middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/products', productRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Centralized error handling (must be last)
app.use(errorMiddleware);

module.exports = app;
