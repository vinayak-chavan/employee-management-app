module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Fixed', 'Dedicated'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Completed', 'In Progress', 'Maintanance', 'Not Started', 'Halt'),
        allowNull: false,
      },
      probable_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    },
  );
  Project.associate = (models) => {
    Project.hasMany(models.ProjectClient, {
      foreignKey: 'projectId',
    });
    Project.hasMany(models.ProjectEmployee, {
      foreignKey: 'employeeId',
    });
  };
  return Project;
};
