module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DailyAttendances', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    employeeId: {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'Employees' },
        key: 'id',
      },
      allowNull: false,
    },
    totalMinutes: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
    },
    log: {
      type: Sequelize.JSONB,
    },
    date: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    month: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: (new Date().getMonth() + 1),
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: new Date().getFullYear(),
    },
    finalLog: {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    isOnLeave: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isArchived: {
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
  down: queryInterface => queryInterface.dropTable('DailyAttendances'),
};
