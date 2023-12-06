const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dehupkc5s",
  api_key: "678525939692372",
  api_secret: "KedG22s85iisJ_IT8yiPBcrLYuE",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
  },
});

const uploadImage = multer({ storage: storage });

module.exports = {
  uploadImage,
};
