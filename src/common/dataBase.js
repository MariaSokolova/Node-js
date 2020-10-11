const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

// Users

DB.users.push(new User(), new User(), new User());

const getAllUsers = async () => DB.users.slice(0);

const getUser = async id => DB.users.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.users.push(user);
  return user;
};

const updateUser = async (user, id) => {
  const idx = DB.users.findIndex(u => u.id === id);
  if (idx === -1) {
    return;
  }
  const updatedUser = {
    ...user,
    id
  };
  DB.users[idx] = updatedUser;
  return updatedUser;
};

const deleteUser = async id => {
  const user = getUser(id);
  if (!user) {
    return;
  }
  DB.users = DB.users.filter(el => el.id !== id);
  return user;
};

// Boards

DB.boards.push(new Board());

const getAllBoards = async () => DB.boards.slice(0);

const getBoardById = async id => DB.boards.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB.boards.push(board);
  return board;
};

const updateBoard = async (board, id) => {
  const idx = DB.boards.findIndex(b => b.id === id);
  if (idx === -1) {
    return;
  }
  const updatedBoard = {
    ...board,
    id
  };
  DB.boards[idx] = updatedBoard;
  return updatedBoard;
};

const deleteBoard = async id => {
  const board = getBoardById(id);
  console.log('id from DB', id);
  if (!board) {
    return;
  }
  DB.board = DB.boards.filter(el => el.id !== id);
  return board;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
