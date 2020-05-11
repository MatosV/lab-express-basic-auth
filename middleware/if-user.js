const User = require ('./../models/user');

const ifUSer = (req, res, next) => {
  const userUserName = req.session.unsername;

  if (userUserName === " " || userUserName === userUserName){
    res.render('/user-sign-up', {
      errorMessage: 'Please enter a new username to sing up.'
  });
  return;
  };


  module.exports = ifUSer;
  

