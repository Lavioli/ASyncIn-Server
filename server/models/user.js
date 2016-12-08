import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const trackSchema = {
  title: String,
  link: String,
  source: String,
  thumbnail: String,
  
}

const UserSchema = new mongoose.Schema({
  //For frontend's local login registration, username is display name.
  //For Google, email address before @gmail.com is displayname.
  //For Facebook, display name is username.
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
  //For local login, email will be considered token.
  //For Facebook and Google logins, profile.id will considered token.
  token: {
    type: String,
    required: true,
    unique: true
  },
  favouritePlaylists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlists'
    }
  ],
  queue: [trackSchema]
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

UserSchema.statics.findOneAndValidate = function(token, password) {
  return new Promise((res, rej) => {
    this.findOne({ token })
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

export default User;
