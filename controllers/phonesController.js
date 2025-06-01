const{ Phone}=require('../models')
const { Op } = require('sequelize');

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
       const [,{updatedPhone}] = await Phone.update(body,{where: { id: userId }});
       return res.status(200).send(updatedPhone)
    }
    catch(error){
        next(error)
    }
}
module.exports.deletePhone = async (req, res, next)=>{           
    try {     
        const { params:{phoneId} } = req;
            const deletedCount = await User.destroy({
              where: { id: phoneId },
            });
            return res.status(200).send({ message: `User deleted successfully`})
     }
    catch(error){ 
        next(error)
    }
}
module.exports.getFilteredPhones = async (req, res, next)=>{ 
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
    

        const { year, brand, model } = req.query;
    
        const where = {};
    
        if (year) {
          where.year = year;
        }
    
        if (brand) {
          where.brand = {
            [Op.iLike]: `%${brand}%`,
          };
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
    }catch (error) {
        next(error);
    }
}
module.exports.getPhonesAboveYear = async (req, res, next) => {
  try {
    const { params: { year }} = req;
    const phones = await Phone.findAll({
      where: {
        year: {
          [Op.gt]: year, 
        },
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