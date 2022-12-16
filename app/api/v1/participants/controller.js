const {
    signupParticipant,
    signinParticipant,
    activateParticipant,
    getAllBimbel,
  } = require('../../../services/mongoose/participants');
  
  const { StatusCodes } = require('http-status-codes');
  
  const signup = async (req, res, next) => {
    try {
      const result = await signupParticipant(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const activeParticipant = async (req, res, next) => {
    try {
      const result = await activateParticipant(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const signin = async (req, res, next) => {
    try {
      const result = await signinParticipant(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const getAllLandingPage = async (req, res, next) => {
    try {
      const result = await getAllBimbel(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    signup,
    signin,
    activeParticipant,
    getAllLandingPage,
  };
  