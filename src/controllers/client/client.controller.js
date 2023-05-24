import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { successResponse, errorResponse } from '../../helpers/index';
import { Client, ProjectEmployee, ProjectClient } from '../../models';
import * as roles from '../../constants/index';

export const addNewClient = async (req, res) => {
  try {
    const {
      name, email, slackId, city, state, country, organization,
    } = req.body;
    const clientDetails = {
      id: uuidv4(),
      name,
      email,
      slackId,
      city,
      state,
      country,
      organization,
    };

    // Check if Client email or slackID already exist or not
    const isUserExist = await Client.findAll({ where: { [Op.or]: [{ email }, { slackId }] } });

    if (isUserExist.length) {
      return errorResponse(req, res, 'EmailID or slackID alreay exists in the database !!!', 412);
    }

    const newClient = await Client.create(clientDetails);
    return successResponse(req, res, newClient, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while adding clients data !!!', 409, error.message);
  }
};

export const getAllClient = async (req, res) => {
  // Details required for pagination
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 6;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'ASC';
  const searchWord = req.query.searchWord || '';

  // Clients Data for ADMIN or HR
  if ([roles.ADMIN, roles.HR].includes(req.user.role)) {
    try {
      // Fetch all clients data for dropdown
      if (req.query.all) {
        // Try and catch block
        const allClients = await Client.findAll({ where: { isArchived: false } });
        return successResponse(req, res, allClients, 500);
      }

      const allClients = await Client.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchWord}%` } },
            { email: { [Op.iLike]: `%${searchWord}%` } },
            { slackId: { [Op.iLike]: `%${searchWord}%` } },
            { city: { [Op.iLike]: `%${searchWord}%` } },
            { state: { [Op.iLike]: `%${searchWord}%` } },
            { country: { [Op.iLike]: `%${searchWord}%` } },
            { organization: { [Op.iLike]: `%${searchWord}%` } },
          ],
        },
        attributes: ['id', 'name', 'email', 'slackId', 'organization'],
        order: [[`${sortBy}`, `${sortOrder}`]],
        offset: (page - 1) * count,
        limit: count,
      });

      const clientsData = allClients.rows;
      clientsData.push({ totalCount: allClients.count });
      clientsData.push({ role: req.user.role });

      return successResponse(req, res, clientsData, 200);
    } catch (error) {
      return errorResponse(req, res, 'Error while fetching clients data !!!', 500, error.message);
    }
  }

  // For PM
  try {
    // Project's ProjectsId which are allocated to PM
    let projectsId = await ProjectEmployee.findAll({
      where: { employeeId: req.user.id },
      attributes: ['projectId'],
    });
    projectsId = projectsId.map(elem => elem.projectId);

    // Client's Data with pagination details
    const findAndCountClient = await Client.findAndCountAll({
      where: {
        [Op.and]: [
          { isArchived: false },
          {
            [Op.or]: [
              { name: { [Op.iLike]: `%${searchWord}%` } },
              { email: { [Op.iLike]: `%${searchWord}%` } },
              { slackId: { [Op.iLike]: `%${searchWord}%` } },
              { city: { [Op.iLike]: `%${searchWord}%` } },
              { state: { [Op.iLike]: `%${searchWord}%` } },
              { country: { [Op.iLike]: `%${searchWord}%` } },
              { organization: { [Op.iLike]: `%${searchWord}%` } },
            ],
          },
        ],
      },
      include: [{
        model: ProjectClient,
        where: {
          projectId: projectsId,
        },
      }],
      attributes: ['id', 'name', 'email', 'slackId', 'organization'],
      distinct: true,
      order: [[`${sortBy}`, `${sortOrder}`]],
      offset: (page - 1) * count,
      limit: count,
    });

    const clientsData = findAndCountClient.rows;
    clientsData.push({ totalCount: findAndCountClient.count });
    clientsData.push({ role: req.user.role });

    return successResponse(req, res, clientsData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching clients data !!!', 500, error.message);
  }
};

export const editClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const {
      name, city, state, country, organization, isArchived,
    } = req.body;

    const updatedClient = await Client.update({
      name, city, state, country, organization, isArchived,
    }, { returning: true, where: { id: clientId } });

    return successResponse(req, res, updatedClient[1], 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while updating clients data !!!', 500, error.message);
  }
};

export const getOneClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const matchedClient = await Client.findOne({ where: { id: clientId } });

    if (!matchedClient) {
      return errorResponse(req, res, 'Client data does not exist !!!', 412);
    }

    return successResponse(req, res, matchedClient, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching client details !!!', 500, error.message);
  }
};
