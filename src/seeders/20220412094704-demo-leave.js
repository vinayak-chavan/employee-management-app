/* eslint-disable no-unused-vars */
const uuidv4 = require('uuid').v4;

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Leaves', [{
      id: uuidv4(),
      employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
      startDate: '2022-05-13',
      endDate: '2022-05-15',
      status: 'pending',
      reason: 'family function',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
      startDate: '2022-05-13',
      endDate: '2022-05-15',
      status: 'rejected',
      reason: 'sick leave',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Leaves', null, {}),
};
