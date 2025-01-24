const Products = require("../models/products");

const getAllProducts = async (req, res) => {
    try{
      const products = await Products.find();
      res.json(products);
    }
    catch(err){
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  
  module.exports = {getAllProducts};