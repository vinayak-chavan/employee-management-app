import { Op } from 'sequelize';
import * as helpers from '../../helpers';
import { Employee, Poc, Technology } from '../../models';

export const getPoc = async (req, res) => {
  try {
    if (req.user.role === 'DEV') {
      const poc = await Poc.findAll(
        {
          attributes: ['field'],
          include: [
            {
              model: Employee,
              attributes: ['firstName', 'lastName', 'email'],
            },
          ],
        },
      );
      // console.log(JSON.stringify(poc, null, 2));
      res.status(200);
      return helpers.successResponse(req, res, poc, 200);
    }
    const poc = await Poc.findAll(
      {
        attributes: ['field'],
        include: [
          {
            model: Employee,
            attributes: ['firstName', 'lastName', 'email'],
          },
        ],
      },
    );
    // console.log(JSON.stringify(poc, null, 2));
    res.status(200);
    return helpers.successResponse(req, res, poc, 200);
  } catch (error) {
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

export const addPoc = async (req, res) => {
  try {
    const employee = await Employee.findOne(
      {
        where: {
          email: req.body.contactEmployee,
        },
        attributes: ['id'],
      },
    );
    if (!employee) {
      return helpers.errorResponse(req, res, `employee email ${req.body.contactEmployee} does not exist`, 404);
    }

    const poc = await Poc.create(
      {
        field: req.body.field,
        employeeId: employee.id,
      },
    );

    res.status(201);
    return helpers.successResponse(req, res, poc, 201);
  } catch (error) {
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

export const updatePoc = async (req, res) => {
  try {
    const employee = await Employee.findOne(
      {
        where: {
          email: req.body.contactEmployee,
        },
        attributes: ['id'],
      },
    );
    if (!employee) {
      return helpers.errorResponse(req, res, `employee email ${req.body.contactEmployee} does not exist`, 404);
    }

    const poc = await Poc.find(
      {
        where: {
          field: req.body.field,
        },
      },
    );
    if (!poc) {
      return helpers.errorResponse(req, res, `Field ${req.body.field} does not exist.`, 404);
    }

    poc.employeeId = employee.id;
    await poc.save();
    res.status(201);
    return helpers.successResponse(req, res, poc, 201);
  } catch (error) {
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

// get technology
export const getTechnology = async (req, res) => {
  try {
    const tech = await Technology.findAll(
      {
        attributes: ['techName'],
      },
    );
    res.status(200);
    return helpers.successResponse(req, res, tech, 200);
  } catch (error) {
    return helpers.errorResponse(req, res, 'something went wrong', 500, error);
  }
};

export const addTechnology = async (req, res) => {
  try {
    const tech = await Technology.findOne(
      {
        where: {
          techName: {
            [Op.iLike]: `${req.body.techName}`,
          },
        },
      },
    );
    if (tech) {
      return helpers.errorResponse(req, res, 'technology data already exists', 409);
    }

    const newTech = await Technology.create(
      {
        techName: req.body.techName,
      },
    );

    res.status(201);
    return helpers.successResponse(req, res, newTech, 201);
  } catch (error) {
    // console.log(error);
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

export const updateTechnology = async (req, res) => {
  try {
    const tech = await Technology.findOne(
      {
        where: {
          techName: {
            [Op.iLike]: `${req.body.techName}`,
          },
        },
      },
    );
    if (!tech) {
      return helpers.errorResponse(req, res, 'technology not found!', 404);
    }

    tech.techName = req.body.newTech;
    await tech.save();

    res.status(201);
    return helpers.successResponse(req, res, 'tech updated successfully!', 200);
  } catch (error) {
    // console.log(error);
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

export const renderPocView = (req, res) => {
  res.status(200);
  res.render('employee/poc');
};

// render setting page
export const settingView = (req, res) => {
  res.status(200);
  return res.render('settings',
    {
      role: req.user.role,
    });
};
