var mongoose = require( 'mongoose' );
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    salt: { type: String },
    hash: { type: String }
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 16).toString('hex');
};

userSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 16).toString('hex');
  return this.hash === hash;
};

userSchema.statics.isAuthorized = function(username, password, callback) {
  var User = this;

  User.findOne({username: username}, function(err, user) {
    if (err) {
      callback(err);
    } else if (user) {
      if (user.checkPassword(password)) {
        callback(null, user);
      } else {
        callback(new Error('Password is incorrect'));
      }
    } else {
      callback(new Error('User not found'));
    }
  });
};

module.exports = mongoose.model('User', userSchema);