import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as roles from '../../constants/index';
import {
  Employee, Project, ProjectClient, ProjectEmployee, Client,
} from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';

const addProject = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { name, type, probable_end_date } = req.body;
    const payload = {
      projectId: uuidv4(),
      name,
      type,
      status: 'Not Started',
      probable_end_date,
    };
    const newProject = await Project.create(payload);
    return successResponse(req, res, newProject, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const singleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const matchedProject = await Project.findOne({ where: { projectId: id } });
    if (!matchedProject) {
      return errorResponse(req, res, 'Not Project Found', 404);
    }
    return successResponse(req, res, matchedProject, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400);
  }
};


// eslint-disable-next-line consistent-return
const viewProject = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) || 12;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'ASC';
    const searchWord = req.query.searchWord || '';

    // ADMIN and HR role
    // role file
    if ([roles.ADMIN, roles.HR].includes(req.user.role)) {
      const allProjects = await Project.findAll({
        where: { name: { [Op.iLike]: `%${searchWord}%` } },
        offset: (page - 1) * count,
        order: [[`${sortBy}`, `${sortOrder}`]],
        limit: count,
      });
      const totalCount = await Project.findAll({
        where: { name: { [Op.iLike]: `%${searchWord}%` } },
      });
      allProjects.push({ totalCount: totalCount.length });
      allProjects.push({ role: req.user.role });
      return successResponse(req, res, allProjects, 200);
    } if (req.user.role === roles.DEV || req.user.role === roles.PM) {
      let projectsId = await ProjectEmployee.findAll({
        where: { employeeId: req.user.id },
        attributes: ['projectId'],
      });
      projectsId = projectsId.map(ele => ele.projectId);
      const projectsData = await Project.findAll({
        where: {
          [Op.and]: [{ projectId: { [Op.in]: projectsId } },
            { isArchived: false },
            { name: { [Op.iLike]: `%${searchWord}%` } }],
        },
        distinct: true,
        order: [[`${sortBy}`, `${sortOrder}`]],
        offset: (page - 1) * count,
        limit: count,
      });

      const totalCount = await Project.findAll({
        where: {
          [Op.and]: [{
            projectId:
              { [Op.in]: projectsId },
          },
          { isArchived: false },
          { name: { [Op.iLike]: `%${searchWord}%` } }],
        },
        distinct: true,
      });
      projectsData.push({ totalCount: totalCount.length });
      projectsData.push({ role: req.user.role });
      return successResponse(req, res, projectsData, 200);
    }
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const ProjectId = req.params.id;
    const client = req.body.client || [];
    const pm = req.body.pm || [];
    const dev = req.body.dev || [];

    if (client) {
      await ProjectClient.destroy({
        where: { projectId: ProjectId },
      });

      const arrProjectClient = [];
      client.forEach((ele) => {
        arrProjectClient.push({ clientId: ele, projectId: ProjectId });
      });

      try {
        await ProjectClient.bulkCreate(arrProjectClient);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
    }

    if (pm || dev) {
      await ProjectEmployee.destroy({
        where: { projectId: ProjectId },
        force: true,
      });

      const arrProjectEmployee = [];
      pm.forEach((ele) => {
        arrProjectEmployee.push({ employeeId: ele, projectId: ProjectId });
      });

      dev.forEach((ele) => {
        arrProjectEmployee.push({ employeeId: ele, projectId: ProjectId });
      });

      try {
        await ProjectEmployee.bulkCreate(arrProjectEmployee);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
    }
    const {
      // eslint-disable-next-line camelcase
      name, type, status, probable_end_date, isArchived,
    } = req.body;
    const updatedProject = await Project.update({
      name, type, status, probable_end_date, isArchived,
    },
    { returning: true, where: { projectId: ProjectId } });
    return successResponse(req, res, updatedProject[1], 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

const projectEmployee = async (req, res) => {
  try {
    const { projectId } = req.params;
    const data = await ProjectEmployee.findAll({

      include: [{
        model: Employee,
        distinct: true,
        attributes: ['firstName', 'lastName', 'email', 'avatar', 'gender', 'role', 'id'],
      }],
      where: { projectId },
      attributes: ['employeeId'],
    });

    return successResponse(req, res, data, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

const projectClient = async (req, res) => {
  try {
    const { projectId } = req.params;
    const data = await ProjectClient.findAll({
      include: [{
        model: Client,
        attributes: ['name', 'email', 'slackId', 'city', 'state', 'country', 'organization'],
        distinct: true,
      }],
      where: { projectId },
      attributes: ['clientId'],
    });
    return successResponse(req, res, data, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

const renderEmployeeProjectView = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const matchedEmp = await Employee.findOne({ where: { id: employeeId } });
    if (!matchedEmp) {
      res.status(401);
      return res.render('message',
        {
          error: 'Data doen not exist !!!', message: '', route: '', text: 'Back',
        });
    }
    return res.render('employee/project');
  } catch (error) {
    res.status(401);
    return res.render('message',
      {
        error: 'Something went Wrong !!!', message: '', route: '', text: 'Back',
      });
  }
};

const renderViewProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const matchedPro = await Project.findOne({ where: { projectId } });
    if (!matchedPro) {
      res.status(401);
      return res.render('message',
        {
          error: 'Data does not exist !!!', message: '', route: '', text: 'Back',
        });
    }
    return res.render('viewProject', { projectId });
  } catch (error) {
    res.status(401);
    return res.render('message',
      {
        error: 'Something went Wrong !!!', message: '', route: '', text: 'Back',
      });
  }
};

module.exports = {
  singleProject,
  addProject,
  updateProject,
  viewProject,
  projectEmployee,
  projectClient,
  renderEmployeeProjectView,
  renderViewProject,
};
