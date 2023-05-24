module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EmployeeContacts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    contactNo: {
      type: Sequelize.STRING,
    },
    secondaryEmail: {
      type: Sequelize.STRING,
    },
    employeeId: {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'Employees' },
        key: 'id',
      },
      allowNull: false,
    },
    houseNo: {
      type: Sequelize.STRING,
    },
    addressLine1: {
      type: Sequelize.STRING,
    },
    addressLine2: {
      type: Sequelize.STRING,
    },
    landmark: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    pincode: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('EmployeeContacts'),
};
