module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Employees', 'verifyToken', {
      type: Sequelize.STRING(1234),
      allowNull: true,
      defaultValue: null,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Employees', 'verifyToken', {
      type: Sequelize.STRING(1234),
      allowNull: true,
    }),
  ]),
};
