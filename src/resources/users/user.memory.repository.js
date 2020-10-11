const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllUsers();

const getById = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`the user with id: ${id} was not found`);
  }
  return user;
};

const create = async user => {
  return DB.createUser(user);
};

const updateUser = async (user, id) => {
  const updetedUser = await DB.updateUser(user, id);
  if (!updetedUser) {
    throw new Error(`the user with id: ${id} was not found`);
  }
  return updetedUser;
};

const deleteUser = async id => {
  const user = await DB.deleteUser(id);
  if (!user) {
    throw new Error(`the user with id: ${id} was not found`);
  }
  return user;
};

module.exports = { getAll, getById, create, updateUser, deleteUser };
