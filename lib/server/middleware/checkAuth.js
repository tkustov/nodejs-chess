module.exports = function(req, res, next) {
  if (!req.session.user) {
      var err = new Error("Don`t login!");
        err.status = 401;
      return next(err);
  }

  if (new Date().getTime() - req.session.timestamp > 45 * 60 *1000) {
      req.session.destroy();
      var err = new Error("Don`t login!");
        err.status = 401;
      return next(err);
  }

  req.session.timestamp = new Date().getTime();
  // if (req.cookies.user == 'admin') {
  // next();
  // } else {
  //   var err = new Error("Middleware failed us");
  //     err.status = 401;
  // }
  next();
};
