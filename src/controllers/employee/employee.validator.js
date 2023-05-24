import joi from 'joi';
import { deleteFile, errorResponse, isValidTech } from '../../helpers';
import {
  ADMIN, DEV, HR, PM,
} from '../../constants';

const validation = joi.object({
  firstName: joi.string().trim(true).required(),
  lastName: joi.string().trim(true).required(),
  middleName: joi.string().trim(true),
  email: joi.string().email().trim(true).required(),
  gender: joi.string().trim(true).valid('male', 'female').required(),
  DOB: joi.date().less('now').required(),
  joiningDate: joi.date().required(),
  role: joi.string().trim(true).valid(ADMIN, DEV, PM, HR).required(),
  careerStartDate: joi.date().required(),

  contactNo: joi.string().trim(true).required(),
  secondaryEmail: joi.string().email().trim(true).allow(''),
  houseNo: joi.string().trim(true).required(),
  addressLine1: joi.string().trim(true).required(),
  addressLine2: joi.string().trim(true).allow(''),
  landmark: joi.string().trim(true).required(),
  city: joi.string().trim(true).required(),
  state: joi.string().trim(true).required(),
  pincode: joi.string().trim(true).length(6).required(),
  country: joi.string().trim(true).required(),

  previousEmployer: joi.string().trim(true),
  employerAddress: joi.string().trim(true),
  workingTime: joi.string().trim(true),

  highestQualification: joi.string().trim(true).required(),
  collage: joi.string().trim(true).required(),
  university: joi.string().trim(true).required(),
  knownTech: joi.array().items(joi.string().required()).required(),
});

export const employeeValidate = async (req, res, next) => {
  // console.log(req.body);
  const payload = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    DOB: req.body.dob,
    role: req.body.role,
    joiningDate: req.body.joiningDate,
    careerStartDate: req.body.careerStartDate,

    collage: req.body.collage,
    highestQualification: req.body.highestQualification,
    university: req.body.university,
    knownTech: req.body.knownTech,

    secondaryEmail: req.body.secondaryEmail,
    contactNo: req.body.contactNo,
    houseNo: req.body.houseNo,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    landmark: req.body.landmark,
    state: req.body.state,
    pincode: req.body.pincode,
    city: req.body.city,
    country: req.body.country,

    previousEmployer: req.body.previousEmployer,
    employerAddress: req.body.employerAddress,
    workingTime: req.body.workingTime,
  };
  // console.log(req.params.employeeId);
  // console.log('FILE', req.file);
  // console.log(req.body);
  const { error } = validation.validate(payload);

  if (!req.file && !req.body.edited) {
    return errorResponse(req, res, 'please upload profile pic', 406);
  }
  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    res.status(406);
    return errorResponse(req, res, `employee data validation error. ${error.message}`, 406, error.message);
  }
  if (!isValidTech(req.body.knownTech)) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, 'selected technology does not exists in system', 406);
  }
  return next();
};

const loginValidation = joi.object({
  email: joi.string().email().trim(true).required(),
  role: joi.string().trim(true).valid(ADMIN, DEV, PM, HR).required(),
  password: joi.string().trim(true).required().min(8)
    .max(12),
});

export const loginValidate = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  };
  const { error } = loginValidation.validate(payload);
  if (error) {
    return errorResponse(req, res, `Validation Error: ${error.message}`, 406);
  }
  return next();
};

const passwordValidation = joi.object({
  currentPassword: joi.string().trim(true).required().min(8)
    .max(12),
  newPassword: joi.string().trim(true).required().min(8)
    .max(12),
  reNewPassword: joi.ref('newPassword'),
});

export const passwordValidate = async (req, res, next) => {
  const payload = {
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
    reNewPassword: req.body.reNewPassword,
  };
  const { error } = passwordValidation.validate(payload);
  if (error) {
    return errorResponse(req, res, 'password validation error', 406, error.message);
  }
  return next();
};
