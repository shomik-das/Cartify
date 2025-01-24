const Products = require("../models/products");

const detailsPage = async (req, res) => {
    const {id} = req.params;
    try{
      const product = await Products.findById(id);
      res.render("detailsPage",{id: id, product: product});
    }
    catch(err){
      console.error('Error fetching product:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  
  module.exports = {detailsPage};