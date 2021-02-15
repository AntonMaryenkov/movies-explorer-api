const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
const RegistrationError = require('../errors/registr-err');
const NotFoundError = require('../errors/not-found-err');
const {
  textEmailIsRegistered,
  textPasswordLonger,
  textNameLengthMin,
  textSimplePassword,
} = require('../constants/constants');

// const { NODE_ENV, JWT_SECRET } = process.env;

const handleError = (err) => {
  if (err.name === 'ValidationError') {
    return true;
  }
  return false;
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (name.trim().length < 2) {
    return next(new NotFoundError(textNameLengthMin));
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new RegistrationError(textEmailIsRegistered));
      }

      return bcrypt.hash(password, 10)
        .then((hash) => {
          if (password.trim().length < 2) {
            return next(new BadRequestError(textSimplePassword));
          }
          if (password.length < 8) {
            return next(new BadRequestError(textPasswordLonger));
          }
          return User.create({
            name, email, password: hash,
          })
            .then((newUser) => res.send({
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
            }))
            .catch((err) => {
              if (handleError(err)) {
                next(new BadRequestError(`${err.message}`));
              } else {
                next(err);
              }
            });
        });
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findOne({ _id: id })
    .then((user) => res.send(user))
    .catch(next);
};

const updateInfoUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (handleError(err)) {
        next(new BadRequestError(`${err.message}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(`${err.message}`));
    });
};

module.exports = {
  getCurrentUser, updateInfoUser, login, createUser,
};
