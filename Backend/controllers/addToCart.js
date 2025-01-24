const Cart = require("../models/cart");
const User = require("../models/user");
const Products = require("../models/products");

const addToCart = async (req, res) => {
  const { id } = req.params; 
  const userId = req.user.id;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the cart entry for this product already exists for the user
    let cartItem = await Cart.findOne({ product: id, user: userId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        product: id,
        user: userId,
        quantity: 1
      });
    }
    
    const user = await User.findById(userId);
    if (!user.cart.includes(cartItem._id)) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    res.status(200).json({ message: "Product added to cart", cartItem });

  }
  catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Internal Server Error');
  }
};


const getAllCartProducts = async (req, res) => {
  try{
    const userID = req.user.id;
    const user = await User.findById(userID).populate({
      path: 'cart',
      populate: {
        path: 'product',
        model: 'Products'
      }
    });
    console.log("this is in backend: ",user.cart);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart); 
  }
  catch(err){
    console.error('Error fetching cart products:', err);
    res.status(500).send('Internal Server Error');
  }

}

module.exports = { addToCart, getAllCartProducts};
