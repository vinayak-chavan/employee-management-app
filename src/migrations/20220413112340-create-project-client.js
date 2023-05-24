module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProjectClients', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    projectId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    clientId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ProjectClients'),
};
