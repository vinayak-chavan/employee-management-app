module.exports = (sequelize) => {
  const EmployeeTech = sequelize.define(
    'EmployeeTech',
    {},
    { timestamps: false },
  );
  return EmployeeTech;
};
