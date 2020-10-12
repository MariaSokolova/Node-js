const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await taskService.getById(req.params.boardId, req.params.id);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.body,
      req.params.boardId,
      req.params.id
    );
    await res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await taskService.deleteTask(req.params.boardId, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
