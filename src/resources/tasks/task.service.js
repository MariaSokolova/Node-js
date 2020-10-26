const taskRepo = require('./task.memory.repository');
// const boardRepo = require('../boards/board.memory.repository');
const Task = require('./task.model');

const getAll = id => taskRepo.getAll(id);

const getById = (boardId, id) => taskRepo.getById(boardId, id);

const create = async (boardId, taskParams) => {
  // await boardRepo.getById(boardId);
  return taskRepo.create(
    new Task({
      ...taskParams,
      boardId
    })
  );
};

const updateTask = (task, boardId, id) =>
  taskRepo.updateTask(task, boardId, id);

const deleteTask = (boardId, id) => taskRepo.deleteTask(boardId, id);

module.exports = { getAll, create, getById, updateTask, deleteTask };
