const router = require('express').Router();

const {
  getCurrentUser, updateInfoUser,
} = require('../controllers/users');

const { validateUserBody } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUserBody, updateInfoUser);

module.exports = router;
