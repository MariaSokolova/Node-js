const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);
//
const create = board => boardsRepo.create(board);
const updateBoard = (board, id) => boardsRepo.updateBoard(board, id);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getById, create, updateBoard, deleteBoard };
