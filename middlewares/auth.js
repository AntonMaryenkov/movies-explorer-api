const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { textAuthRequired } = require('../constants/constants');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(textAuthRequired));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError(textAuthRequired));
  }

  req.user = payload;

  return next();
};
