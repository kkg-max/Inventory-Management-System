// How data is structured in the database for products
const mongoose = require("mongoose");
const Counter = require("./counter.model");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        immutable: true,
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    }

}, { timestamps: true });


productSchema.pre("save", async function () {

    if (!this.isNew) {
        return;
    }

    const counter = await Counter.findOneAndUpdate(
        { _id: "productId" },
        { $inc: { sequence_value: 1 } },
        {
            new: true,
            upsert: true,
            session: this.$session()
        }
    );

    this.productId = `PROD${String(counter.sequence_value).padStart(3, "0")}`;
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
