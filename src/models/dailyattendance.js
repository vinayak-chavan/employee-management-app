module.exports = (sequelize, DataTypes) => {
  const DailyAttendance = sequelize.define(
    'DailyAttendance',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      employeeId: {
        type: DataTypes.UUID,
      },
      totalMinutes: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      log: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValues: [],
      },
      date: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: (new Date().getDate()),
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: (new Date().getMonth() + 1),
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: (new Date().getFullYear()),
      },
      finalLog: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      isOnLeave: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  DailyAttendance.associate = (models) => {
    DailyAttendance.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return DailyAttendance;
};
