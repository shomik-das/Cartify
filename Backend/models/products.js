const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    filename: {
        type: String,
        required: true
    }
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
