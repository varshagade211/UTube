'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      likerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users'
        },
        onDelete:'CASCADE'
      },
      videoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Videos'
        },
        onDelete:'CASCADE'
      },
      commentId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Comments'
        },
        onDelete:'CASCADE'
      },
      likableType: {
        type: Sequelize.STRING(100),
        allowNull:false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};
