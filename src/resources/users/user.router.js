const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const ApiError = require('../../error/ApiError');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  const { name, login, password } = req.body;
  if (!name || !login || !password) {
    next(ApiError.badRequest('Name, login and password are required'));
    return;
  }
  const user = await usersService.create(
    new User({
      ...req.body
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.body, req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
