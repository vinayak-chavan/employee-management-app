module.exports = (sequelize, DataTypes) => {
  const Technology = sequelize.define(
    'Technology',
    {
      techName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  Technology.associate = (models) => {
    Technology.belongsToMany(models.Employee, {
      through: 'EmployeeTech',
      foreignKey: 'techId',
      uniqueKey: 'empTech',
    });
  };
  return Technology;
};
