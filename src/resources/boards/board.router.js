const router = require('express').Router();
const { toResponse } = require('./board.model');
const ApiError = require('../../error/ApiError');
const boardService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.status(200).send(boards.map(toResponse));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.status(200).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = req.body;
    if (!title || !columns) {
      next(ApiError.badRequest('Title and columns are required'));
      return;
    }
    const board = await boardService.create(req.body);
    res.status(200).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.body, req.params.id);
    res.status(200).send(board);
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
