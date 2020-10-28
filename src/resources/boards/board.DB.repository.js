const { Board } = require('./board.model');
const {
  getTasksByBoardId,
  deleteTask
} = require('../tasks/task.DB.repository');
const ApiError = require('../../error/ApiError');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw ApiError.notFound(`the board with id: ${id} was not found`);
  }
  return board;
};

const create = async board => {
  return Board.create(board);
};

const updateBoard = async (board, id) => {
  await Board.update({ _id: id }, board);
  const updatedBoard = await getById(id);
  if (!updatedBoard) {
    throw ApiError.notFound(`the board with id: ${id} was not found`);
  }
  return updatedBoard;
};

const deleteBoard = async id => {
  const board = await getById(id);
  if (!board) {
    throw ApiError.notFound(`the board with id: ${id} was not found`);
  }
  const tasks = await getTasksByBoardId(id);
  tasks.forEach(async task => await deleteTask(id, task._id));
  await Board.deleteOne({ _id: id });
};

module.exports = { getAll, create, getById, updateBoard, deleteBoard };
