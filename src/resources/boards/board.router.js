const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      id: req.body.id,
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.updateBoard(req.body, req.params.id);
    res.json(board);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    console.log('id from router', req.params.id);

    await boardService.deleteBoard(req.params.id);

    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
