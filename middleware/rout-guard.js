const routeGuard = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/user-sign-in');
  }
};

module.exports = routeGuard;