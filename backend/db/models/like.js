'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User,{foreignKey:'likerId'})
      Like.belongsTo(models.Video,{foreignKey:'likableId',as:'Video'})
      Like.belongsTo(models.Comment,{foreignKey:'likableId',as:'Comment'})
    }
  }
  Like.init({
    likerId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    likableId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    likableType: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
