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
    socketId: { type: String },
    scores: { type: Number, default: 0},
    allGames: [String]
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

userSchema.statics.register = function(username, email, password, callback) {
  var User = this;
  var user = new User({username: username, email: email});
  user.setPassword(password);
  user.save(function(err, user) {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
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

userSchema.statics.getStatus = function(userID, callback) {
  var User = this;
  var status;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    status = user.status;
    callback(status);
  });
};

userSchema.methods.setSocketIdMethod = function(socketId) {
  this.socketId = socketId;
  this.save(function(err) {
    if (err) {console.log(err);}
  });
};


userSchema.statics.getSocketId = function(userID, callback) {
  var User = this;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    callback(user.socketId);
  });
};

userSchema.statics.getUsersOnlineExceptCurrent = function(userID, callback) {
  var User = this;
  var usersOnline = [];

  User.find({ 'status': 'online', _id: { $ne: userID } }, function (err, users) {
    users.forEach(function(user) {
      usersOnline.push({id: user._id, name: user.username});
    });
    callback(usersOnline);
  });
};

module.exports = mongoose.model('User', userSchema);