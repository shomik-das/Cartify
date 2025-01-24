const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const {deletePage, deleteProduct} = require("../controllers/deletePage");
const {detailsPage} = require("../controllers/detailsPage");
const {updatePage, updateProduct} = require("../controllers/updatePage");

router.get("/deletePage/:id", deletePage);  //get diyei toh sob hocche
router.post("/deleteProduct", deleteProduct);
router.get("/details/:id", detailsPage);
router.get("/updatePage/:id", updatePage);
router.post("/updateProduct", updateProduct);


module.exports = router;
