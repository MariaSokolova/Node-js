const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const updateUser = (user, id) => usersRepo.updateUser(user, id);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, create, updateUser, deleteUser };
