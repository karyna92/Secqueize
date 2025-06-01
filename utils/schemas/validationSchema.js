const yup = require('yup');

module.exports.PHONE_VALIDATION_SCHEMA = yup.object({
  model: yup
    .string()
    // .required('Model is required')
    .trim()
    .min(1, 'Model cannot be empty'),

  brand: yup
    .string()
    // .required('Brand is required')
    .trim()
    .min(1, 'Brand cannot be empty'),

  year: yup
    .date()
    // .required('Year is required')
    .max(new Date(), 'Year must be in the past or today'),

  ram: yup
    .number()
    // .required('RAM is required')
    .integer('RAM must be an integer')
    .min(1, 'RAM must be at least 1 GB'),

  cpu: yup
    .string()
    // .required('CPU is required')
    .trim()
    .min(1, 'CPU cannot be empty'),

  displaySize: yup
    .number()
    // .required('Display size is required')
    .moreThan(0, 'Display size must be greater than 0'),

  hasNFC: yup.boolean()
  
});
  

module.exports.UPDATE_PHONE_VALIDATION_SCHEMA = yup.object({
  model: yup.string().trim().min(1),
  brand: yup.string().trim().min(1),
  year: yup
    .date()
    .max(new Date(), 'Year must be in the past'),
  ram: yup
    .number()
    .integer()
    .positive(),
  cpu: yup.string().trim().min(1),
  displaySize: yup
    .number()
    .positive()
    .min(0.1),
  hasNFC: yup.boolean(),
}).noUnknown();
