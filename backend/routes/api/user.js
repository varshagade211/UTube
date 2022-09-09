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
    .withMessage('Email is required'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('firstName')
    .isLength({max:20})
    .withMessage('First name must be less than 20 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('lastName')
    .isLength({max:20})
    .withMessage('Last name must be less than 20 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  check('password')
    .isLength({min:8, max:16})
    .withMessage('Password must be 8-16 characters'),

  handleValidationErrors
];

// Sign up
router.post('/', singleMulterUpload("image"),  validateSignup, async (req, res, next) => {
      const { firstName , lastName,email, password, confirmPassword } = req.body;
      let profileImageUrl = null
      let isExist = await User.findOne({where:{email:email}})

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
        if(!['image/jpeg','image/png'].includes(req.file.mimetype)){
          const err = Error('Validation error');
          err.errors = {profile:"Image format not supported, only supports JPEG, PNG"}
          err.status = 400;
          err.title = "Validation Errors"
          return next(err);
        }
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
