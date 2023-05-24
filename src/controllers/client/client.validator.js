import joi from 'joi';
import { errorResponse } from '../../helpers/index';
import { Client } from '../../models';

const clientRegisterObject = joi.object({
  name: joi.string().trim(true).required(),
  email: joi.string().email().trim(true).required(),
  slackId: joi.string().alphanum().min(3).trim(true)
    .required(),
  city: joi.string().trim(true).required(),
  state: joi.string().trim(true).required(),
  country: joi.string().trim(true).required(),
  organization: joi.string().trim(true).required(),
});

export const clientRegisterValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    slackId: req.body.slackId,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    organization: req.body.organization,
  };

  const { error } = clientRegisterObject.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 206, error.details);
  }
  return next();
};

export const clientDataUpdateOject = joi.object({
  name: joi.string().trim(true).required(),
  city: joi.string().trim(true).required(),
  state: joi.string().trim(true).required(),
  country: joi.string().trim(true).required(),
  organization: joi.string().trim(true).required(),
  isArchived: joi.boolean().required(),
});

export const clientUpdateDataValidation = async (req, res, next) => {
  const { clientId } = req.params;
  const matchedClient = await Client.findOne({ where: { id: clientId } });
  if (!matchedClient) {
    return errorResponse(req, res, 'Client does not exist !!!', 500, { error: `Client does not exist with id ${clientId} !!!` });
  }

  const payload = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    organization: req.body.organization,
    isArchived: req.body.isArchived,
  };

  const { error } = clientDataUpdateOject.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 206, error.details);
  }
  return next();
};
