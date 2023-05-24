module.exports = (sequelize, DataTypes) => {
  const ProjectEmployee = sequelize.define(
    'ProjectEmployee',
    {
      employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProjectEmployee',
    },
  );
  ProjectEmployee.associate = (models) => {
    ProjectEmployee.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
    ProjectEmployee.belongsTo(models.Project, {
      foreignKey: 'projectId',
    });
  };
  return ProjectEmployee;
};
