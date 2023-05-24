module.exports = (sequelize, DataTypes) => {
  const ProjectClient = sequelize.define(
    'ProjectClient',
    {
      clientId: {
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
      modelName: 'ProjectClient',
    },
  );
  ProjectClient.associate = (models) => {
    ProjectClient.belongsTo(models.Client, {
      foreignKey: 'clientId',
    });
    ProjectClient.belongsTo(models.Project, {
      foreignKey: 'projectId',
    });
  };
  return ProjectClient;
};
