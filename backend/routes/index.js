const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { validateLogin, validateCreateUser } = require('../utils/validationRules');

router.post(
  '/signin',
  validateLogin,
  login,
);
router.post(
  '/signup',
  validateCreateUser,
  createUser,
);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
