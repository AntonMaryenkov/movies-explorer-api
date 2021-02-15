const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser, updateInfoUser,
} = require('../controllers/users');

const { validateUserBody } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.put('/users/me', validateUserBody, updateInfoUser);

module.exports = router;
