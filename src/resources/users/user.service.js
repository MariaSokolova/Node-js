const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, create, updateUser, deleteUser };
