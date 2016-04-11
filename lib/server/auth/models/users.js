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
    namespace: { type: String }
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

// Methods for User Status
userSchema.methods.updateStatus = function(status) {
  this.status = status;
  this.save(function(err) {
    if (err) {console.log(err);}}
    );
};

userSchema.statics.updateStatusStatic = function(userID, newStatus) {
  var User = this;
  User.findById(userID, function(err, user) {
    if (err) throw err;
    user.updateStatus(newStatus);
  });
};

userSchema.statics.getUserStatus = function(userID, callback) {
  var User = this;
  var status;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    status = user.status;
    callback(status);
  });
};


// Methods for User Namespace
userSchema.methods.generateNamespace = function() {
  var namespace = crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex');
  this.namespace = namespace;
};

userSchema.statics.getNamespaceByUserID = function(userID, callback) {
  var User = this;
  var namespace;

  User.findById(userID, function(err, user) {
    if (err) throw err;
    namespace = user.namespace;
    callback(namespace, user);
  });
};


userSchema.statics.getUsersOnline = function(userID, callback) {
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
