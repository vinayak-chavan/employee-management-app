module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EmployeePreWorks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    employeeId: {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'Employees' },
        key: 'id',
      },
      allowNull: false,
    },
    previousEmployer: {
      type: Sequelize.STRING,
    },
    employerAddress: {
      type: Sequelize.STRING,
    },
    workingTime: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
  down: queryInterface => queryInterface.dropTable('EmployeePreWorks'),
};
