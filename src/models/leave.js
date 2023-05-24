module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  Leave.associate = (models) => {
    Leave.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return Leave;
};
