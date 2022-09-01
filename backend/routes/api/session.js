const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check("email")
    .isEmail()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];
// Log in
router.post('/login', validateLogin, async (req, res, next) => {
  
      const { email, password } = req.body;

      const user = await User.login({ email, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
);

// Log out
router.delete( '/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Restore session user
router.get( '/',restoreUser,(req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

module.exports = router;
