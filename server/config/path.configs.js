// const path = require('path');
// require('dotenv').config();

// const STATIC_PATH = path.join(__dirname, process.env.STATIC_FOLDER || 'public');

// module.exports = {
//   STATIC_PATH,
//   STATIC_IMAGES_FOLDER:  path.join(STATIC_PATH, process.env.STATIC_IMAGES_FOLDER || 'images'),
 // but then you need to make changes to upload!
// };

const path = require('path');

const STATIC_PATH = path.join(__dirname, '..', 'public');

module.exports = {
  STATIC_PATH,
  STATIC_IMAGES_FOLDER: path.join('images'),
};
