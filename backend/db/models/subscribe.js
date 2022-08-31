'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscribe.belongsTo(
        models.User, {
          foreignKey: 'subscriberId' ,

        }
      );

      Subscribe.belongsTo(
        models.User,{
          foreignKey: 'subscribeeId',


        }
      );
    }
  }
  Subscribe.init({
    subscriberId:{
      type: DataTypes.INTEGER,
      allowNull:false

    },
    subscribeeId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Subscribe',
  });
  return Subscribe;
};
