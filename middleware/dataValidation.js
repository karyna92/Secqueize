module.exports = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validate(req.body, { abortEarly: false });
    req.body = validated; 
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        errors: error.errors,
      });
    }
    next(error);
  }
};
