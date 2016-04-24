module.exports = function(req, res, next) {

  if (!req.session.user && req.method !== 'OPTIONS') {
      return res.status(401).send('Access or action denied, please log in');
  }
  next();

};
