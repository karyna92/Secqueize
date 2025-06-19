const { Router } = require('express');
const phonesController= require('../controllers/phonesController');
const pagination= require('../middleware/pagination')
const dataValidation  = require('../middleware/dataValidation');
const upload = require('../middleware/upload');
const {
  PHONE_VALIDATION_SCHEMA,
  UPDATE_PHONE_VALIDATION_SCHEMA,
} = require('../utils/schemas/validationSchema');



const phonesRouter = Router();

phonesRouter.get('/', dataValidation( PHONE_VALIDATION_SCHEMA), phonesController.getAllPhones);


phonesRouter.post('/', phonesController.addPhone);

phonesRouter
  .route('/filters')
  .get(pagination , phonesController.getFilteredPhones)
  .put(phonesController.updateMultiplePhones)
  .delete(phonesController.deleteMultiplePhones);

phonesRouter
  .route('/:phoneId')
  .put(dataValidation(UPDATE_PHONE_VALIDATION_SCHEMA), phonesController.updatePhone)
  .delete(phonesController.deletePhone);

phonesRouter.route('/above/:year').get(phonesController.getPhonesAboveYear);


phonesRouter
  .route('/brands')
  .get(phonesController.getBrands);


phonesRouter
  .route('/brands/:brandName')
  .get(phonesController.getPhonesByBrand)
  .post(phonesController.addPhonesByBrand);

  phonesRouter
    .route('/images/:phoneId')
    .put(upload.PhonesImage, phonesController.updatePhoneImage);       

module.exports = phonesRouter;   