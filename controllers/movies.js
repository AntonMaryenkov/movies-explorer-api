const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const RegistrationError = require('../errors/registr-err');
const {
  textInvalidData,
  textMovieNotFound,
  textUnableToDelete,
  textIncorrectCardId,
} = require('../constants/constants');

const getMyMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const creatorId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.findOne({ movieId, owner: creatorId })
    .then((result) => {
      if (result === null) {
        return Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          movieId,
          nameRU,
          nameEN,
          thumbnail,
          owner: creatorId,
        })
          .then((movie) => {
            res.send(movie);
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError(textInvalidData));
            } else {
              next(err);
            }
          });
      }
      return next(new RegistrationError('Фильм с таким id уже есть в базе'));
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError(textMovieNotFound))
    .then((movie) => {
      if (req.user._id !== String(movie.owner)) {
        next(new ForbiddenError(textUnableToDelete));
      } else {
        Movie.findByIdAndDelete(movie)
          .then((remoteCard) => {
            res.send({ data: remoteCard });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(textIncorrectCardId));
      } if (err.statusCode === 404) {
        next(new NotFoundError(`${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMyMovies, createMovie, deleteMovie,
};
