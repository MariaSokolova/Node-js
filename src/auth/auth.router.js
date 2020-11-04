const router = require('express').Router();
const authService = require('./auth.service');

router.post('/', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await authService.signToken(login, password);

    if (!token) {
      res.status(403).send('Wrong login/password combination!');
    } else {
      res.status(200).json(token);
    }
  } catch (e) {
    return next;
  }
});

module.exports = router;
