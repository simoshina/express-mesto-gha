const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62b745bef85b172349404ea9',
  };
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
})

app.use('*', (err, req, res, next) => {
  throw new NotFoundError('Такой страницы не существует.')
});

app.listen(PORT);
