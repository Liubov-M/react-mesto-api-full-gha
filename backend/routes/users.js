const router = require('express').Router();
const {
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../utils/validationRules');

const {
  getUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);

router.get(
  '/:userId',
  validateGetUserById,
  getUserById,
);
router.patch(
  '/me',
  validateUpdateUser,
  updateUser,
);
router.patch(
  '/me/avatar',
  validateUpdateAvatar,
  updateAvatar,
);

module.exports = router;
