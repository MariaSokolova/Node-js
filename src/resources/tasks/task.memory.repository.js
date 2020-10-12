const DB = require('../../common/dataBase');

const getAll = async id => DB.getAllTasks(id);

const getById = async (boardId, id) => {
  const task = await DB.getTaskById(boardId, id);
  if (!task) {
    throw new Error(`the task with id: ${id} was not found`);
  }
  return task;
};

const create = async task => {
  return DB.createTask(task);
};

const updateTask = async (task, boardId, id) => {
  const updatedTask = await DB.updateTask(task, boardId, id);
  if (!updatedTask) {
    throw new Error(`the task with id: ${id} was not found`);
  }
  return updatedTask;
};

const deleteTask = async (boardId, id) => {
  const board = await DB.deleteTask(boardId, id);
  if (!board) {
    throw new Error(`the task with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, create, getById, updateTask, deleteTask };
