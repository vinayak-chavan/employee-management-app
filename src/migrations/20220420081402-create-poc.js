module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Pocs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    field: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employeeId: {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'Employees' },
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Pocs'),
};
