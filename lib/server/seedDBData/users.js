function seedUsers(){
  return new Promise(function(resolve, reject) {
    var User = require('../models/users');
    var users = require('./users.json')
    User.find({}).remove(function(err) {
      if (err) {
        reject(err);
        return;
      }
      User.create(users, function (err) {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  })
};

module.exports = seedUsers;
