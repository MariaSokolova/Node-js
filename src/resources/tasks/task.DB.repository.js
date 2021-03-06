const { Task } = require('./task.model');
const ApiError = require('../../error/ApiError');

const getTasksByBoardId = async boardId => {
  return await Task.find({ boardId });
};

const getById = async (boardId, id) => {
  const task = await Task.findById(id);
  if (!task || task.boardId !== boardId) {
    throw ApiError.notFound(`the task with id: ${id} was not found`);
  }
  return task;
};

const create = async (boardId, task) => {
  task.boardId = boardId;
  return await Task.create(task);
};

const updateTask = async (task, boardId, id) => {
  task.boardId = boardId;
  const updatedTask = await Task.findByIdAndUpdate(id, task);
  if (!updatedTask) {
    throw ApiError.notFound(`the task with id: ${id} was not found`);
  }
  return updatedTask;
};

const deleteTask = async (boardId, id) => {
  await getById(boardId, id);
  await Task.deleteOne({ _id: id });
};
const unassignUserTasks = async userId => {
  return await Task.updateMany({ userId }, { userId: null });
};

const removeByBoardId = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getTasksByBoardId,
  create,
  getById,
  updateTask,
  deleteTask,
  unassignUserTasks,
  removeByBoardId
};
