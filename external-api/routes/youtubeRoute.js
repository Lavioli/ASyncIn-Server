const express = require('express');
const youtubeRouter = express.Router();

youtubeRouter
  .route('/')
  .get((req, res) => {
    res.json('hello')
  });

export default youtubeRouter;

// youtubeRouter
//   .route('/')

//   .get(passport.authenticate('basic', { session: false }), (req, res) => {
//     User.find()
//       .select('username')
//       .then(users => res.json(users))
//       .catch(err => res.sendStatus(500));
//   })

//   .post((req, res) => {
//     const validatorResponse = validateUser(req.body);
//     if (validatorResponse.error) return res.status(validatorResponse.status).json(validatorResponse.body);

//     User.createUser(req.body.username, req.body.password)
//       .then(user => {
//         res.set('Location', `/api/v1/users/${user.username}`);
//         return res.status(201).json({});
//       })
//       .catch(err => {
//         console.error(err);
//         if (err.status === 400) return res.status(400).json({ message: err.message });

//         return res.sendStatus(500);
//       });
//   });


// module.exports = usersRouter;
