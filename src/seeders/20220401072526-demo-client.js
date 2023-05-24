/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Clients',
    [
      {
        id: uuidv4(),
        name: 'Client 1',
        email: 'client.1@bacancy.com',
        slackId: 'slackId1',
        city: 'Surat',
        state: 'Gujarat',
        country: 'India',
        organization: 'Bacancy Technology',
      },
      {
        id: uuidv4(),
        name: 'Client 2',
        email: 'client.2@bacancy.com',
        slackId: 'slackId2',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        organization: 'Simform Solutions',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Clients', null, {}),
};
