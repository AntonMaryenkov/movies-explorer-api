const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

const {
  createUser, login,
} = require('../controllers/users');
const {
  validateAuthentication, validateRegister,
} = require('../middlewares/validation');

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateRegister, createUser);
router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
