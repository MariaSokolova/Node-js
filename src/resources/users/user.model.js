const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

const User = mongoose.model('User', userSchema);

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'Qwer123'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }
//
//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }

module.exports = User;
