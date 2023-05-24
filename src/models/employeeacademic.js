module.exports = (sequelize, DataTypes) => {
  const EmployeeAcademic = sequelize.define(
    'EmployeeAcademic',
    {
      employeeId: {
        type: DataTypes.UUID,
      },
      highestQualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      knownTech: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
  );
  EmployeeAcademic.associate = (models) => {
    EmployeeAcademic.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return EmployeeAcademic;
};
