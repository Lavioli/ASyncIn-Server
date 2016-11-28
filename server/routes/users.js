const express = require('express');
const usersRouter = express.Router();
const passport = require('../config/passport');
const bcrypt = require('bcrypt');

const validateUser = require('./validators').validateUser;

const User = require('../models/user');

usersRouter
  .route('/')

  .get(passport.authenticate('basic', { session: false }), (req, res) => {
    User.find()
      .select('username')
      .then(users => res.json(users))
      .catch(err => res.sendStatus(500));
  })

  .post((req, res) => {
    const validatorResponse = validateUser(req.body);
    if (validatorResponse.error) return res.status(validatorResponse.status).json(validatorResponse.body);

    User.createUser(req.body.username, req.body.password)
      .then(user => {
        res.set('Location', `/api/v1/users/${user.username}`);
        return res.status(201).json({});
      })
      .catch(err => {
        console.error(err);
        if (err.status === 400) return res.status(400).json({ message: err.message });

        return res.sendStatus(500);
      });
  });

usersRouter
  .route('/:username')

  .get(passport.authenticate('basic', { session: false }), (req, res) => {
    User.findOne({ username: req.params.username })
      .select('username')
      .then(user => {
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.json(user);
      })
      .catch(err => res.sendStatus(500));

  })

  .put(passport.authenticate('basic', { session: false }), (req, res) => {
    const validatorResponse = validateUser(req.body);
    if (validatorResponse.error) return res.status(validatorResponse.status).json(validatorResponse.body);
    if (req.user.username !== req.params.username) return res.sendStatus(401);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        User.findOneAndUpdate({ username: req.user.username }, { username: req.body.username, password: hash })
          .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });

            return res.json({});
          })
          .catch(() => res.sendStatus(500));
      });
    });
  })

module.exports = usersRouter;
