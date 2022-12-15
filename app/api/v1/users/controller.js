const {
    createUsers,
    getAllUsers,
  } = require('../../../services/mongoose/users');
  
  const { StatusCodes } = require('http-status-codes');
  
  const create = async (req, res, next) => {
    try {
      const result = await createUsers(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const index = async (req, res, next) => {
    try {
      const result = await getAllUsers(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    index,
    create,
  };