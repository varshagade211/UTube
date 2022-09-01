'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.belongsTo(models.User,{foreignKey:'uploaderId'})
      // Video.hasMany(models.Comment,{foreignKey:'videoId', onDelete: 'cascade'})
      // Video.hasMany(models.Like,{foreignKey:'likableId', onDelete: 'cascade'})
      Video.hasMany(models.Comment,{foreignKey:'videoId'})
      Video.hasMany(models.Like,{foreignKey:'videoId'})
    }
  }
  Video.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100]
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,1000]
      }
    },
    url:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,1000]
      }
    },
    type:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100]
      }
    },
    views: {
     type: DataTypes.INTEGER,
    },

    uploaderId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
