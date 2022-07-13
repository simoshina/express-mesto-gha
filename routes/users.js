const router = require('express').Router();
const {
  findUsers, findUser, updateUserInfo, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.get('/users', findUsers);
router.get('/users/:userId', findUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
