const router = require('express').Router();
const Board = require('./board.model');
const ApiError = require('../../error/ApiError');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  const { title, columns } = req.body;
  if (!title || !columns) {
    next(ApiError.badRequest('Title and columns are required'));
    return;
  }
  const board = await boardService.create(
    new Board({
      ...req.body
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.body, req.params.id);
    res.json(board);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.status(204).send();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
