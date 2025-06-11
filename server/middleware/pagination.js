const MAX_LIMIT = 5;

module.exports = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || MAX_LIMIT;

    if (limit <= 0 || limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }

    const offset = (page - 1) * limit;

    req.pagination = {
      limit,
      offset,
      page,
    };

    next();
  } catch (error) {
    next(error);
  }
};
