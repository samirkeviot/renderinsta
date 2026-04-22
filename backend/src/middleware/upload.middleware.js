const coudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage =  new CloudinaryStorage({
  cloudinary: coudinary,
  params: {
    folder: "instagram-clone",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage });


module.exports = upload;
