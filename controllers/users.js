const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name == "CastError") {
        return next(new NotFoundError('Пользователь по указанному id не найден.'))
      }
      next(err)
    }
  )
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'))
      }
      next(err)
    }
  )
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'))
      } else if (err.name == "CastError") {
        return next(new NotFoundError('Пользователь с указанным id не найден.'))
      }
      next(err)
    }
  )
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'))
      } else if (err.name == "CastError") {
        return next(new NotFoundError('Пользователь с указанным id не найден.'))
      }
      next(err)
    }
  )
};
