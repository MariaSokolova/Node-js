const router = require('express').Router({ mergeParams: true });

const { toResponse } = require('./task.model');
const ApiError = require('../../error/ApiError');
const taskService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    res.status(200).send(tasks.map(toResponse));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.boardId, req.params.id);
    res.status(200).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      next(ApiError.badRequest('Title and userId  is required'));
      return;
    }
    const task = await taskService.create(req.params.boardId, req.body);
    res.status(200).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.body,
      req.params.boardId,
      req.params.id
    );
    res.status(200).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.boardId, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
