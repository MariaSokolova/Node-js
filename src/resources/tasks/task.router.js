const router = require('express').Router({ mergeParams: true });

const ApiError = require('../../error/ApiError');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.boardId, req.params.id);
    res.json(task);
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
    res.json(task);
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
    await res.json(task);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.boardId, req.params.id);
    res.status(204).send();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
