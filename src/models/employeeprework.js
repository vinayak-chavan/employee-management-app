module.exports = (sequelize, DataTypes) => {
  const EmployeePreWork = sequelize.define(
    'EmployeePreWork',
    {
      employeeId: {
        type: DataTypes.UUID,
      },
      previousEmployer: {
        type: DataTypes.STRING,
      },
      employerAddress: {
        type: DataTypes.STRING,
      },
      workingTime: {
        type: DataTypes.STRING,
      },
    },
  );
  EmployeePreWork.associate = (models) => {
    EmployeePreWork.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return EmployeePreWork;
};
