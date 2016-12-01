// const BearerStrategy = require('passport-http-bearer').Strategy;
// const passport = require('../config/passport');

// const User = require('../models/user');


//  passport.use(
//     new BearerStrategy(
//         function(accessToken, done) {
//             console.log('bearer strategy');
//             User.findOne({
//                     accessToken: accessToken,
//                 },
//                 function(err, user) {
//                     console.log(user);
//                     if (err) {
//                         return done(err)
//                     }
//                     if (!user) {
//                         return done(null, false)
//                     }

//                     return done(null, user, {
//                         scope: 'all'
//                     })
//                 }
//             );
//         }
//     )
// );