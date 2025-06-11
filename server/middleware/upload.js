const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../config/path.configs');

// const upload = multer({ dest: path.resolve(__dirname, '../public/images') });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`)
  }
});

const upload = multer({ storage});

module.exports.PhonesImage= upload.single('image');  // single() for one image file