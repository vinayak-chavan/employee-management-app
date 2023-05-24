
module.exports = (sequelize, DataTypes) => {
  const Poc = sequelize.define(
    'Poc',
    {
      field: {
        type: DataTypes.STRING,
      },
      employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
  );
  Poc.associate = (models) => {
    Poc.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return Poc;
};
