const mongoose = require("mongoose");

const cart =  new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: {
        type: Number,
        default: 1
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cart = mongoose.model("Cart", cart);

module.exports = Cart;
