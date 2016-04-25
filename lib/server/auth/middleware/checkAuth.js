module.exports = function(req, res, next) {
  if (!req.session.user && req.method !== 'OPTIONS') {
      return res.status(401).send('Access or action denied, please log in');
  }

  if (Date.now() - req.session.timestamp > 45 * 60 * 1000) {
      req.session.destroy();
      return res.status(401).send('Access or action denied, please log in');
  }
  
  next();
};
