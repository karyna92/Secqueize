const{ Phone, Brand}=require('../models')
const { Op } = require('sequelize');
const path = require('path');
const createHttpError = require('http-errors');
const { STATIC_IMAGES_FOLDER } = require('../config/path.configs');

module.exports.getAllPhones = async (req, res) =>{ 
  try { 
console.log('all phones')
res.status(200).json('all phones here')
  }catch{ 
    res.status(5000).json({message: 'Error'})
  }
}

module.exports.addPhone = async (req,res, next)=>{
    try {
        const { body } = req;
        const addedPhone = await Phone.create(body);
      return res.status(201).send(addedPhone)  
    }
    catch(error){
        console.error('Error adding phone:', error);
        res
          .status(500)
          .json({ message: 'Failed to add phone', error: error.message }); 
    }
}

module.exports.updatePhone = async( req, res, next)=>{
    try {
        const { body, params:{phoneId} } = req;; 
       const [updateCount] = await Phone.update(body, {where: { id: phoneId }});

       if (updateCount === 0) {
         return res
           .status(404)
           .json({ message: 'Phone not found or nothing changed' });
       }
       res.status(200).send({ message: 'Phone updated' });
    }
    catch(error){
        next(error)
    }
}
module.exports.deletePhone = async (req, res, next)=>{    
  throw new Error(`Phone with id ${phoneId} not found`);       
    try {     
        const { params:{phoneId} } = req;
            const deletedCount = await Phone.destroy({
              where: { id: phoneId },
            });
       if (deletedCount === 0) {
         return res
           .status(404)
           .json({ message: 'Phone not found' });
       }
       res.status(200).send({ message: `Phone deleted successfully` });
     }
    catch(error){ 
        next(error)
    }
}
module.exports.getFilteredPhones = async (req, res, next) => {
    try {
      const { year, model } = req.query;
      const { limit, offset, page } = req.pagination;
  
      const where = {};


  
      if (year) {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
where.year = { [Op.between]: [startDate, endDate] };
      }
  
      if (model) {
        where.model = {
          [Op.iLike]: `%${model}%`,
        };
      }
  
      const { count, rows } = await Phone.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        phones: rows,
      });
    } catch (error) {
      next(error);
    }
  };
module.exports.getPhonesAboveYear = async (req, res, next) => {
  try {
    const { params: { year }} = req;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const phones = await Phone.findAll({
      where: {
        year: { [Op.between]: [startDate, endDate] }
      },
      order: [['year', 'ASC']],
    });
    res.status(200).send(phones);
  } catch (error) {
    next(error);
  }
};
// module.exports.updateMultiplePhones = async (req, res, next) => {
//   try {
//     const { year, brand, model, ram, cpu, has_nfc, display_size } = req.query;
//     const updatedValues = req.body;

//     const where = {};

//     if (year) where.year = year;
//     if (brand) where.brand = brand;
//     if (model) where.model = model;
//     if (ram) where.ram = ram;
//     if (cpu) where.cpu = cpu;
//     if (has_nfc !== undefined) where.hasNFC = has_nfc === 'true'; 
//     if (display_size) where.displaySize = display_size;

//     if (Object.keys(where).length === 0) {
//       return res
//         .status(400)
//         .json({ error: 'At least one filter must be provided in query.' });
//     }

//     const [affectedRows] = await Phone.update(updatedValues, {
//       where,
//     });

//     res.status(200).json({
//       message: `Updated ${affectedRows} phone(s).`,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports.updateMultiplePhones = async (req, res, next) => {
  try {
    const { filters = {}, updates = {} } = req.body;

    if (Object.keys(filters).length === 0) {
      return res
        .status(400)
        .json({ error: 'At least one filter is required.' });
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: 'At least one update field is required.' });
    }

    const [affectedRows] = await Phone.update(updates, {
      where: filters,
    });

    res.status(200).send({
      message: `Updated ${affectedRows} phone(s).`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteMultiplePhones= async (req, res, next) =>{
     try { 
        const { filters = {} } = req.body;

    if (Object.keys(filters).length === 0) {
      return res
        .status(400)
        .json({ error: 'At least one filter is required to delete records.' });
    }

    const deletedCount = await Phone.destroy({
      where: filters,
    });

    res.status(200).send({
      message: `Deleted ${deletedCount} phone(s).`,
    });

     }catch(error){ 
        next(error);
     }
}

module.exports.getPhonesByBrand = async (req, res, next) => {
  try {
    const { brandName } = req.params;

    const brand = await Brand.findOne({ where: { name: brandName } });

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    const phones = await Phone.findAll({
      where: { brandId: brand.id },
      include: [{ model: Brand}],
    });

    res.json(phones);
  } catch (error) {
  next(error)
  }
};

module.exports.addPhonesByBrand = async (req, res, next) =>{ 
  try{
    const phoneData = req.body;
    const { brandName } = req.params;
    const brand = await Brand.findOne({ where: { name: brandName } });

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    const newPhone = await Phone.create({
      ...phoneData,
      brandId: brand.id,
    });
    res.status(201).json(newPhone);
  } catch(error){
     next(error);
  }
}

module.exports.updatePhoneImage = async (req, res, next) =>
{
  // uploadController.js
   
      const {
        file,
        params: { phoneId },
      } = req;
    
      try {
        if (!file) {
          return next((422, 'Image is Required'));
        }
    
        const [, [updatedPhone]] = await Phone.update(
          { image: path.join(STATIC_IMAGES_FOLDER, file.filename) }, // "images/filename"
          { where: { id: phoneId }, returning: true, raw: true }
        );
    
        if (!updatedPhone) {
          return next(createHttpError(404, 'Phone Not Found'));
        }
    
        res.status(200).send({ data: updatedPhone});
      } catch (error) {
        next(error);
      }
  };

