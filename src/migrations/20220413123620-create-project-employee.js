module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProjectEmployees', {
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
    employeeId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ProjectEmployees'),
};
