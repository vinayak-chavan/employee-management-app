module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Leaves', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    employeeId: {
      type: Sequelize.UUID,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    reason: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
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
  down: queryInterface => queryInterface.dropTable('Leaves'),
};
