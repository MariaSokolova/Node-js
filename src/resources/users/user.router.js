const router = require('express').Router();

const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const ApiError = require('../../error/ApiError');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(toResponse));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(toResponse(user));
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
  const user = await usersService.create(req.body);
  res.status(200).send(toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
