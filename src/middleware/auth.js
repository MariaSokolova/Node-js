const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user!');
    } else {
      try {
        req.user = jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        return next();
      }
      return next();
    }
  }
  res.status(401).send('Unauthorized user!');
};
