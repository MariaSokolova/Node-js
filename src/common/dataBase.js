const User = require('../resources/users/user.model');
const DB = {
  users: [],
  boards: [],
  tasks: []
};

DB.users.push(new User(), new User(), new User());

const getAllUsers = async () => DB.users.slice(0);

const getUser = async id => DB.users.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.users.push(user);
  return user;
};

const updateUser = async (user, id) => {
  const idx = DB.users.findIndex(u => u.id === id);
  if (idx === -1) {
    return;
  }
  const updatedUser = {
    ...user,
    id
  };
  DB.users[idx] = updatedUser;
  return updatedUser;
};

const deleteUser = async id => {
  const user = getUser(id);
  if (!user) {
    return;
  }
  DB.users = DB.users.filter(el => el.id !== id);
  return user;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
