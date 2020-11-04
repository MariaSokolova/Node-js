const bcrypt = require('bcryptjs');

const time = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Warsaw'
  });

const defaultStatus = 10;

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(defaultStatus);
  return await bcrypt.hash(password, salt);
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = { time, hashPassword, checkHashedPassword };
