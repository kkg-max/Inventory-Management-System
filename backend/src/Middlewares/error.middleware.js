const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate value already exists";
    }

    // Mongoose CastError
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid data format";
    }

    // Mongoose ValidationError
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorMiddleware;