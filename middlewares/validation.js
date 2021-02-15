const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Запоните поле "Имя"',
        'string.empty': 'Запоните поле "Имя"',
        'string.min': 'Минимальная длина поля "Имя" - 2 символа',
        'string.max': 'Максимальная длина поля "Имя" - 30 символов',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Запоните поле "email"',
        'string.empty': 'Запоните поле "email"',
      }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "country" не может быть пустым',
        'string.empty': 'Поле "country" не может быть пустым',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "director" не может быть пустым',
        'string.empty': 'Поле "director" не может быть пустым',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" не может быть пустым',
        // 'number.number': 'Поле "duration" не может быть пустым',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "year" не может быть пустым',
        'string.empty': 'Поле "year" не может быть пустым',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "description" не может быть пустым',
        'string.empty': 'Поле "description" не может быть пустым',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка в поле "image"');
    })
      .messages({
        'any.required': 'Поле "image" не может быть пустым',
        'string.empty': 'Поле "image" не может быть пустым',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка в поле "trailer"');
    })
      .messages({
        'any.required': 'Поле "trailer" не может быть пустым',
        'string.empty': 'Поле "trailer" не может быть пустым',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка в поле "thumbnail"');
    })
      .messages({
        'any.required': 'Поле "thumbnail" не может быть пустым',
        'string.empty': 'Поле "thumbnail" не может быть пустым',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле "movieId" не может быть пустым',
        // 'string.empty': 'Поле "movieId" не может быть пустым',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameRU" не может быть пустым',
        'string.empty': 'Поле "nameRU" не может быть пустым',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameEN" не может быть пустым',
        'string.empty': 'Поле "nameEN" не может быть пустым',
      }),
  }),
});

const validateObjId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Запоните поле "email"',
        'string.empty': 'Запоните поле "email"',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Запоните поле "Пароль"',
        'string.empty': 'Запоните поле "Пароль"',
      }),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Запоните поле "email"',
        'string.empty': 'Запоните поле "email"',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Запоните поле "Пароль"',
        'string.empty': 'Запоните поле "Пароль"',
        'string.min': 'Минимальная длина поля "Пароль" - 8 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Запоните поле "Имя"',
        'string.empty': 'Запоните поле "Имя"',
        'string.min': 'Минимальная длина поля "Имя" - 2 символа',
        'string.max': 'Максимальная длина поля "Имя" - 30 символов',
      }),
  }),
});

module.exports = {
  validateUserBody, validateMovieBody, validateObjId, validateAuthentication, validateRegister,
};
