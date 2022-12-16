const {
    getAllBimbel,
    getOneBimbel,
    updateBimbel,
    createBimbel,
    deleteBimbel,
    changeStatusBimbel,
  } = require('../../../services/mongoose/bimbel');
  
  const { StatusCodes } = require('http-status-codes');
  
  const create = async (req, res, next) => {
    try {
      const result = await createBimbel(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const index = async (req, res, next) => {
    try {
      const result = await getAllBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const find = async (req, res, next) => {
    try {
      const result = await getOneBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const result = await updateBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const destroy = async (req, res, next) => {
    try {
      const result = await deleteBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const changeStatus = async (req, res, next) => {
    try {
      const result = await changeStatusBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    index,
    find,
    update,
    destroy,
    create,
    changeStatusBimbel,
  };