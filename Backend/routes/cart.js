const express = require("express");
const router = express.Router();

const {addToCart, getAllCartProducts} = require("../controllers/addToCart");
const {Authorization, Authentication} = require("../middlewares/Auth");

router.get("/addToCart/:id",Authentication, addToCart);
router.post("/getAllCartProducts",Authentication, getAllCartProducts);

module.exports = router;