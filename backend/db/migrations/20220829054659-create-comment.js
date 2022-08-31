'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING(1000),
        allowNull:false
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Videos'
        },
        onDelete:'CASCADE'
      },
      commenterId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users'
        },
        onDelete:'CASCADE'
      },
      parentCommentId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Comments');
  }
};
