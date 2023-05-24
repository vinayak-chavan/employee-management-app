module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EmployeeTeches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    employeeId: {
      type: Sequelize.UUID,
    },
    techId: {
      type: Sequelize.INTEGER,
    },
  }),
  down: queryInterface => queryInterface.dropTable('EmployeeTeches'),
};
