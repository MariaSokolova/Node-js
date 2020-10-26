const { Board } = require('./board.model');
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
  let updatedBoard = await getById(id);
  console.log('updatedBoard', updatedBoard);
  if (!updatedBoard) {
    throw ApiError.notFound(`the board with id: ${id} was not found`);
  }
  updatedBoard = await Board.updateOne(board, { _id: id });
  return updatedBoard;
};

const deleteBoard = async id => {
  const board = await getById(id);
  if (!board) {
    throw ApiError.notFound(`the board with id: ${id} was not found`);
  }
  await Board.deleteOne({ _id: id });
};

module.exports = { getAll, create, getById, updateBoard, deleteBoard };
