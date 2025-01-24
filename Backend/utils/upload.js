const upload = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.error("Error uploading file", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = upload;
