import joi from 'joi';
import { errorResponse } from '../../helpers/index';

// validation on add leave page for employee(DEV)
const leaveRegisterValid = joi.object({
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  reason: joi.string().trim(true).required(),
});

exports.leaveRegisterValidation = async (req, res, next) => {
  const payload = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
  };
  const { error } = leaveRegisterValid.validate(payload);
  if (error) {
    errorResponse(req, res, error.message, 206, error.details);
  } else {
    next();
  }
};

// validation on update leave page for employee(DEV)
const leaveUpdateValid = joi.object({
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  reason: joi.string().trim(true).required(),
  status: joi.string().trim(true).valid('pending', 'approved', 'rejected'),
});

exports.leaveUpdateValidation = async (req, res, next) => {
  const payload = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    status: req.body.status,
  };
  const { error } = leaveUpdateValid.validate(payload);
  if (error) {
    errorResponse(req, res, error.message, 206, error.details);
  } else {
    next();
  }
};
