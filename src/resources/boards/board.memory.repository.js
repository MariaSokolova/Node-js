const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllBoards();

const getById = async id => {
  const board = await DB.getBoardById(id);
  if (!board) {
    throw new Error(`the board with id: ${id} was not found`);
  }
  return board;
};

const create = async board => {
  return DB.createBoard(board);
};

const updateBoard = async (board, id) => {
  const updatedBoard = await DB.updateBoard(board, id);
  if (!updateBoard) {
    throw new Error(`the board with id: ${id} was not found`);
  }
  return updatedBoard;
};

const deleteBoard = async id => {
  const board = await DB.deleteBoard(id);
  if (!board) {
    throw new Error(`the board with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, getById, create, updateBoard, deleteBoard };