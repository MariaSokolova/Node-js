const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = { User, toResponse };
