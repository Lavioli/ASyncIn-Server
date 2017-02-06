import passport from 'passport';
import {BasicStrategy} from 'passport-http';

import User from '../models/user';

passport.use(new BasicStrategy((token, password, cb) => {
  return User.findOneAndValidate(token, password)
    .then(user => {
      if (!user) return cb(null, false);

      return cb(null, user);
    })

    .catch(err => cb(err));
}));

export default passport;