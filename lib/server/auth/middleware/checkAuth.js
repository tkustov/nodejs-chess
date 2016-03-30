module.exports = function(req, res, next) {
  if (!req.session.user) {
      return res.status(401).send('Access or action denied, please log in');
  }

  if (new Date().getTime() - req.session.timestamp > 45 * 60 *1000) {
      req.session.destroy();
      return res.status(401).send('Access or action denied, please log in');
  }

  req.session.timestamp = new Date().getTime();
  next();
};
