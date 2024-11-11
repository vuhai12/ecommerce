const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// require('dotenv').config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ['jpg', 'png'],
//   params: {
//     folder:'book' 
//   }
// });

// const uploadCloud = multer({ storage });

// module.exports = uploadCloud;


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./files")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})



const uploadCloud = multer({storage})
// const uploadCloud = multer({ dest:'files/' });
// const uploadCloud = (multer());


module.exports = uploadCloud;


