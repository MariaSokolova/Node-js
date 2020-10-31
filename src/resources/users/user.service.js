const usersRepo = require('./user.DB.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = async id => {
  await tasksService.unassignUserTasks(id);
  return await usersRepo.deleteUser(id);
};

module.exports = { getAll, getById, create, updateUser, deleteUser };
