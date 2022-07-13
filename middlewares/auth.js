/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const SECRET_KEY = '20b3c1dc4cc747685c0e2759c9d70041bd8a0843b9f6a1c9b1c68dca224da3bd';

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new UnauthorizedError('Необходима авторизация.'));

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) return next(new UnauthorizedError('Необходима авторизация.'));
    req.user = payload;
    next();
  });
};
