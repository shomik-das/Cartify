const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/upload"));
  },
  filename: (req, file, cb) => {
    var name = Date.now() + ".jpg";
    cb(null, name);
  },
});
const filter = (req, file, cb) => {
  var ext = file.mimetype.split("/")[1];
  if (ext == "jpeg" || ext == "png" || ext == "jpg") {
    cb(null, true);
  } else {
    cb(new Error("not supported file"), false);
  }
};
const uploadMiddleware = multer({ storage: storage, fileFilter: filter });

const { upload } = require("../controllers/upload");
const { getAllProducts } = require("../controllers/products");

router.post("/upload", uploadMiddleware.single("pic"), upload);
router.get("/products", getAllProducts);

module.exports = router;
