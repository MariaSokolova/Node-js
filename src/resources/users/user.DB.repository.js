const ApiError = require('../../error/ApiError');
const { User } = require('./user.model');
const { hashPassword } = require('../../common/utils');

const getAll = async () => User.find({});

const create = async user => {
  const checkUser = await User.findOne({ login: user.login });
  if (checkUser) {
    throw ApiError.badRequest(
      `the user with login: ${user.login} is already exists`
    );
  }
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  return User.create(newUser);
};

const getByLogin = async login => await User.findOne({ login });

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

module.exports = {
  getAll,
  create,
  getById,
  deleteUser,
  updateUser,
  getByLogin
};
