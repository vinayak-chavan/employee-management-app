import joi from 'joi';

import { errorResponse } from '../../helpers/index';

const validation = joi.object({
  name: joi.string().min(3).max(50).trim(true)
    .required(),
  type: joi.string().valid('Fixed', 'Dedicated').required(),
  probable_end_date: joi.string().required(),
  isArchived: joi.string().default(false),
});

// eslint-disable-next-line consistent-return
const projectValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    type: req.body.type,
    probable_end_date: req.body.probable_end_date,
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return errorResponse(req, res, error.message);
  }
  next();
};
module.exports = projectValidation;
