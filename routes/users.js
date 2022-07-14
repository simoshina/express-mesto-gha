const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUsers, findUser, updateUserInfo, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.get('/', findUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex(),
  }),
}), findUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/(http||https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/),
  }),
}), updateAvatar);

module.exports = router;
