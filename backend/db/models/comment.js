'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Comment.belongsTo(models.User,{foreignKey:'CommenterId'})
       Comment.belongsTo(models.Video,{foreignKey:'videoId'})
      //  Comment.hasMany(models.Like,{foreignKey:'likableId', onDelete: 'cascade'})
      Comment.hasMany(models.Like,{foreignKey:'likableId'})
    }
  }
  Comment.init({
    comment: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,1000]
      }
    },
    videoId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    commenterId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    parentCommentId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
