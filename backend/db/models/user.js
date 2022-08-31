'use strict';
const bcrypt = require('bcryptjs')
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id,firstName,lastName,email,profileImageUrl } = this; // context will be the User instance
      return { id,firstName,lastName,email,profileImageUrl};
    }
    //validate password using bcrypt
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    //getcurrentUserid
    static getCurrentUserId(id){
      return User.scope('currentUser').findByPk(id)
   }
   static async findUser(email){
     const user = await User.scope('loginUser').findOne({
       where: {
         email: email
       }
     });
     return user
   }
   //login use
   static async login({ email, password }) {
     const { Op } = require('sequelize');
     const user = await User.scope('loginUser').findOne({
       where: {
         email: email
       }
     });

     if (user && user.validatePassword(password)) {
       return await User.scope('currentUser').findByPk(user.id);
     }
   }

   //signUp method
   static async signup ({firstName,lastName,email,password,profileImageUrl}) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        hashedPassword,
        profileImageUrl
      }
    )
    return await User.scope('currentUser').findByPk(user.id)
  }



    static associate(models) {
      // User.hasMany(models.Video,{foreignKey:'uploaderId', onDelete: 'cascade'})
      // User.hasMany(models.Comment,{foreignKey:'commenterId', onDelete: 'cascade'})
      // User.hasMany(models.Like,{foreignKey:'likerId',  onDelete: 'cascade'})

      // User.belongsToMany(
      //   models.User,
      //     { through: models.Subscribe, as: 'subscriber', foreignKey: 'subscriberId', onDelete: 'cascade' },
      // );

      // User.belongsToMany(
      //   models.User,
      //     { through: models.Subscribe, as: 'subscribee', foreignKey: 'subscribeeId' ,  onDelete: 'cascade'},
      // );

      User.hasMany(models.Video,{foreignKey:'uploaderId'})
      User.hasMany(models.Comment,{foreignKey:'commenterId'})
      User.hasMany(models.Like,{foreignKey:'likerId'})

      User.belongsToMany(
        models.User,
          { through: models.Subscribe, as: 'subscriber', foreignKey: 'subscriberId'},
      );

      User.belongsToMany(
        models.User,
          { through: models.Subscribe, as: 'subscribee', foreignKey: 'subscribeeId'},
      );
    }
  }
  User.init({
    firstName:{
      type:DataTypes.STRING,
      allowNull:false,
   },
   lastName:{
     type:DataTypes.STRING,
     allowNull:false,
   },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    profileImageUrl: {
      type: DataTypes.STRING(1000),
    },

     hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes:{
      currentUser: {
        attributes:{exclude:["hashedPassword"]}
      },
      loginUser:{
        attributes: {}
      }
    },

  });
  return User;
};
