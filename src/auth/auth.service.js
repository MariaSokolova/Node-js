const jwt = require('jsonwebtoken');

const userRepo = require('../resources/users/user.DB.repository');
const { checkHashedPassword } = require('../common/utils');
const { JWT_SECRET_KEY } = require('../common/config');

const signToken = async (userLogin, password) => {
  const user = await userRepo.getByLogin(userLogin);

  if (!user) {
    return null;
  }
  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);

  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '15m'
    });
    return token;
  }

  return null;
};

module.exports = {
  signToken
};
