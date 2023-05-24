module.exports = (sequelize, DataTypes) => {
  const EmployeeContact = sequelize.define(
    'EmployeeContact',
    {
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondaryEmail: {
        type: DataTypes.STRING,
      },
      employeeId: {
        type: DataTypes.UUID,
      },
      houseNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
      },
      landmark: {
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
      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  EmployeeContact.associate = (models) => {
    EmployeeContact.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  };
  return EmployeeContact;
};
