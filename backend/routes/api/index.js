const router = require('express').Router();
const { setTokenCookie,restoreUser,requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const videoRouter = require('./video.js');
const commentRouter = require('./comment.js')
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/video', videoRouter);
router.use('/comment', commentRouter);

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
