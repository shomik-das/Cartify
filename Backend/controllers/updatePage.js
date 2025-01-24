const Products = require("../models/products");



const updatePage = async (req, res) => {
    const {id} = req.params;
    try{
      const product = await Products.findById(id);
      res.render("updatePage",{id: id, product: product});
    }
    catch(err){
      console.error('Error fetching product:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  



  const updateProduct = async(req,res)=>{
    const {productId,productName, productPrice, productDescription} = req.body;
    console.log("this is product id", productId);
    try{
        const products = await Products.findByIdAndUpdate(productId, { name: productName, price: productPrice, description: productDescription}, { new: true });
        if(products){
            res.redirect('/');
        }
        else{
            res.send("product not fount");
        }
    }
    catch(error){
        console.error("error updating the product:", error);
        res.send("internal server error");
    }
}
  
  
module.exports = {updatePage, updateProduct};