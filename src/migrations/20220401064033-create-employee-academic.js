module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmployeeAcademics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: 'Employees' },
          key: 'id',
        },
        allowNull: false,
      },
      highestQualification: {
        type: Sequelize.STRING,
      },
      collage: {
        type: Sequelize.STRING,
      },
      university: {
        type: Sequelize.STRING,
      },
      knownTech: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('EmployeeAcademics');
  },
};
