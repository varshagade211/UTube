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
      Like.belongsTo(models.Video,{foreignKey:'videoId'})
      Like.belongsTo(models.Comment,{foreignKey:'commentId'})
    }
  }
  Like.init({
    likerId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    videoId:{
      type: DataTypes.INTEGER,
    },
    commentId:{
      type: DataTypes.INTEGER,
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
