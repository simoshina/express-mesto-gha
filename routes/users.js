const router = require('express').Router();
const {
  findUsers, findUser, createUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.get('/users', findUsers);
router.get('/users/:userId', findUser);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
