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
    .withMessage('Please provide a valid email.'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('firstName')
    .isString()
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('lastName')
    .isString()
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('password is required'),

  handleValidationErrors
];

// Sign up
router.post('/', singleMulterUpload("image"),  validateSignup, async (req, res) => {
      const { firstName , lastName,email, password } = req.body;
      let profileImageUrl = null
      if(req.file){
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
