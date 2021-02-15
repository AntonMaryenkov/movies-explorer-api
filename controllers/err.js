const NotFoundError = require('../errors/not-found-err');
const { textNotFound } = require('../constants/constants');

const error = (req, res, next) => {
  next(new NotFoundError(textNotFound));
};

module.exports = error;
