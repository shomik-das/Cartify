const Products = require("../models/products");
const Cart = require("../models/cart");
const User = require("../models/user");

const deletePage = async (req, res) => {
    const {id} = req.params;
    try{
      const product = await Products.findById(id);
      res.render("delete",{id: id, product: product});
    }
    catch(err){
      console.error('Error fetching product:', err);
      res.status(500).send('Internal Server Error');
    }
  };


  const deleteProduct = async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Products.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await Cart.deleteMany({ product: productId });
        
        await User.updateMany(
            { cart: { $in: productId } }, 
            { $pull: { cart: productId } }
        );

        res.redirect("/");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = {deletePage, deleteProduct};