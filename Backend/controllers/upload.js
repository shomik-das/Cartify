const Products = require("../models/products");

const upload = async (req, res) => {
    const { name, price, description} = req.body;
    const filename = req.file.filename;

    try {
        await Products.create({
            name,
            price,
            description,
            filename
        });

       
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { upload };
