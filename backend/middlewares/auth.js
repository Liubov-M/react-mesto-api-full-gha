const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const Unauthorized = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) return next(new Unauthorized('Необходима авторизация'));

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
