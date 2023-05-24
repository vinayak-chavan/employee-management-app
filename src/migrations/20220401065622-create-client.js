module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Clients', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    slackId: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    organization: {
      type: Sequelize.STRING,
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Clients'),
};
