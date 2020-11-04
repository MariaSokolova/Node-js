const taskRepo = require('./task.DB.repository');
const boardRepo = require('../boards/board.DB.repository');

const getAll = id => taskRepo.getTasksByBoardId(id);

const getById = (boardId, id) => taskRepo.getById(boardId, id);

const create = async (boardId, taskParams) => {
  await boardRepo.getById(boardId);
  return taskRepo.create(boardId, taskParams);
};

const updateTask = (task, boardId, id) =>
  taskRepo.updateTask(task, boardId, id);

const deleteTask = (boardId, id) => taskRepo.deleteTask(boardId, id);

const unassignUserTasks = userId => taskRepo.unassignUserTasks(userId);

const removeByBoardId = boardId => taskRepo.removeByBoardId(boardId);

module.exports = {
  getAll,
  create,
  getById,
  updateTask,
  deleteTask,
  unassignUserTasks,
  removeByBoardId
};
