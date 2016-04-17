var mongoose = require( 'mongoose' );
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    salt: { type: String },
    hash: { type: String },
    status: { type: String, default: 'offline'},
    userRoom: { type: String }
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 16).toString('hex');
};

userSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 16).toString('hex');
  return this.hash === hash;
};

userSchema.statics.authorization = function(username, password, callback) {
  var User = this;

  User.findOne({'$or': [{username: username}, {email: username}]}, function(err, user) {
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

// Methods for User Status:
userSchema.methods.updateStatusMethod = function(newStatus) {
  this.status = newStatus;
  this.save(function(err) {
    if (err) {console.log(err);}
  });
};

userSchema.statics.updateStatus = function(userID, newStatus) {
  var User = this;
  User.findById(userID, function(err, user) {
    if (err) throw err;
    user.updateStatusMethod(newStatus);
  });
};

userSchema.statics.getStatus = function(userID, callback) {
  var User = this;
  var status;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    status = user.status;
    callback(status);
  });
};

// Methods for User Room:
userSchema.methods.generateUserRoom = function(userName) {
  var userRoom = crypto.createHash('md5').update(userName+new Date().getTime().toString()).digest('hex');
  this.userRoom = userRoom;
};

userSchema.statics.getUserRoom = function(userID, callback) {
  var User = this;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    callback(user.userRoom);
  });
};

module.exports = mongoose.model('User', userSchema);
