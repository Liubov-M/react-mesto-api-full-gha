const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/mestodb';
const PORT = process.env.PORT || 3000;

module.exports = {
  JWT_SECRET, PORT, DB_URL,
};
