const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'))
      }
      next(err)
    }
  )
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name == "CastError") {
        return next(new NotFoundError('Карточка с указанным id не найдена.'))
      }
      next(err)
    }
  )
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'))
      } else if (err.name == "CastError") {
        return next(new NotFoundError('Передан несуществующий id карточки.'))
      }
      next(err)
    }
  )
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name == "ValidationError") {
        return next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'))
      } else if (err.name == "CastError") {
        return next(new NotFoundError('Передан несуществующий id карточки.'))
      }
      next(err)
    }
  )
};
