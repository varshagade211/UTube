const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload,singleMulterUpload} = require('../../awsS3')


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Email is required'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('firstName')
    .isString()
    .withMessage('First Name is required'),
  check('firstName')
    .isLength({max:30})
    .withMessage('Please provide firstname less than 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('lastName')
    .isString()
    .withMessage('Last Name is required'),
  check('lastName')
    .isLength({max:30})
    .withMessage('Please provide lastname less than 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),



  handleValidationErrors
];

// Sign up
router.post('/', singleMulterUpload("image"),  validateSignup, async (req, res, next) => {
      const { firstName , lastName,email, password, confirmPassword } = req.body;
      let profileImageUrl = null
      let isExist = await User.findOne({where:{email:email}})
       if (password.length < 8) {
        const err = new Error('Password must be more than eight characters');
        err.status = 401;
        err.title = "Validation Errors";
        err.errors = {password:'Password must be more than eight characters'}
        return next(err);
      }
      if(isExist){
        const err = Error('Validation error');
        err.errors = {email:"Email already exists"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);
      }
      if(password !== confirmPassword){
        const err = Error('Validation error');
        err.errors = {confirmPassword:"Password and confirm password must be same"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);

      }

      if(req.file){
        if(req.file.size > 1048576){
          const err = Error('Validation error');
          err.errors = {profile:"Maximum allowed file size is 1MB"}
          err.status = 400;
          err.title = "Validation Errors"
          return next(err);
        }
        profileImageUrl = await singlePublicFileUpload(req.file);
      }

      const user = await User.signup({firstName ,lastName , email , password , profileImageUrl});

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
);


module.exports = router;
