const boardsRepo = require('./board.DB.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const updateBoard = (board, id) => boardsRepo.updateBoard(board, id);

const deleteBoard = async id => {
  await tasksService.removeByBoardId(id);
  return await boardsRepo.deleteBoard(id);
};

module.exports = { getAll, getById, create, updateBoard, deleteBoard };
