const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// usersRouter.get();

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // saltRounds = 10
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  });

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;