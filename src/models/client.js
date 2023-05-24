module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slackId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Client',
    },
  );
  Client.associate = (models) => {
    Client.hasMany(models.ProjectClient, {
      foreignKey: 'clientId',
    });
  };
  return Client;
};
