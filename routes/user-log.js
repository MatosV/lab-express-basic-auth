const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const userLog = new express.Router();

// USER REGISTRATION / SIGN-UP

userLog.get('/user-sign-up', (req, res) => {
  res.render('user-sign-up');
  console.log('User registration is now live');
});

userLog.post('/user-sign-up', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username.length === 0) {
    next(new Error('Please enter a new username to sing up.'));
    return;
  }

  if (password.length === 0) {
    next(new Error(`Password field can't be empty`));
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hashSalt) => {
      return User.create({
        username,
        password: hashSalt
      });
    })
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

// USER LOG IN / SIGN-IN

userLog.get('/user-sign-in', (req, res) => {
  res.render('user-sign-in');
  console.log('Hello user, you can long in now');
});

userLog.post('/user-sign-in', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  User.findOne({
    username
  })
    .then(userPw => {
      user = userPw;
      return bcrypt.compare(password, user.password);
    })
    .then(usernameComp => {
      if (usernameComp) {
        req.session.username = username;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('PW IS DIFFERENT'));
      }
    })
    .catch(err => {
      next(err);
    });
});

// USER LOG OUT

userLog.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = userLog;
