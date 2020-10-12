const taskRepo = require('./task.memory.repository');

const getAll = id => taskRepo.getAll(id);

const getById = (boardId, id) => taskRepo.getById(boardId, id);

const create = task => taskRepo.create(task);

const updateTask = (task, boardId, id) =>
  taskRepo.updateTask(task, boardId, id);

const deleteTask = (boardId, id) => taskRepo.deleteTask(boardId, id);

module.exports = { getAll, create, getById, updateTask, deleteTask };
