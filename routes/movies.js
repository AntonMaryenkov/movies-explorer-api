const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getMyMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validateMovieBody, validateObjId,
} = require('../middlewares/validation');

router.get('/movies', getMyMovies);
router.post('/movies', validateMovieBody, createMovie);
router.delete('/movies/:movieId', validateObjId, deleteMovie);

module.exports = router;
