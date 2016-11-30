const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  accessToken: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.statics.createUser = function(username, password, token, accessToken, id) {
  const newUser = { username:username, token:token, accessToken:accessToken};
  if (id) newUser._id = id;

  return new Promise((res, rej) => {
    this.findOne({ token })
      .then(user => {
        if (user) return rej({ status: 400, message: 'User already exists'});

        return bcrypt.genSalt(10, (err, salt) => {
          if (err) rej(err);

          return bcrypt.hash(password, salt, (err, hash) => {
            if (err) rej(err);
            newUser.password = hash;

            return this.create(newUser, (err, user) => {
              if (err) rej(err);

              return res(user);
            });
          });
        });
      })
      .catch(err => {
        console.error(err);
        rej(err);
      });
  });
};

UserSchema.statics.findOneAndValidate = function(username, password) {
  return new Promise((res, rej) => {
    this.findOne({ username })
      .then(user => {
        if (!user) return res(null);

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) rej(err);
          if (!isValid) return res(false);

          return res(user);
        });
      })
      .catch(err => {
        console.error(err);
        return rej(err);
      });
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
