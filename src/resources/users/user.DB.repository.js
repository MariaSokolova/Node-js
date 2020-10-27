const ApiError = require('../../error/ApiError');
const { User } = require('./user.model');
const { getAllTasks } = require('../tasks/task.DB.repository');

const getAll = async () => User.find({});

const create = async user => User.create(user);

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound(`the user with id: ${id} was not found`);
  }
  return user;
};

const updateUser = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  const updatedUser = getById(id);
  if (!updatedUser) {
    throw ApiError.notFound(`the user with id: ${id} was not found`);
  }
  return updatedUser;
};

const deleteUser = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound(`the user with id: ${id} was not found`);
  }
  const tasks = await getAllTasks();
  console.log('tasks', tasks);
  tasks
    .filter(task => task.userId === id)
    .forEach(task => (task.userId = null));
  await User.deleteOne({ _id: id });
};

module.exports = { getAll, create, getById, deleteUser, updateUser };
