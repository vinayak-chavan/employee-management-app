module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Technologies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      techName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Technologies');
  },
};
