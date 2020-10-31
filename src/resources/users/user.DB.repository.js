const ApiError = require('../../error/ApiError');
const { User } = require('./user.model');

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
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  if (!updatedUser) {
    throw ApiError.notFound(`the user with id: ${id} was not found`);
  }
  return updatedUser;
};

const deleteUser = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound(`the user with id: ${id} was not found`);
  }
};

module.exports = { getAll, create, getById, deleteUser, updateUser };
