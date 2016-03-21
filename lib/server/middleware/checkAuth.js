module.exports = function(req, res, next) {
   if (!req.session.user) {
      var err = new Error("Don`t login!");
         err.status = 401;
      return next(err);
   }

   if (new Date().getTime() - req.session.timestamp > 30000) {
      req.session.destroy();
      var err = new Error("Don`t login!");
         err.status = 401;
      return next(err);
   }

   req.session.timestamp = new Date().getTime();
   next();
}
