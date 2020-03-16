const express = require('express');
const passport = require('passport');

const router = express.Router();
const scope = [
  'https://www.googleapis.com/auth/photoslibrary',
  'https://www.googleapis.com/auth/photoslibrary.readonly',
  'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
];

router.post(
  '/login',
  passport.authenticate('google', {
    scope,
    failureFlash: true, // Display errors to the user.
    session: true,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    failureFlash: true,
    session: true,
  }),
  async (req, res) => {
    const { username, password } = req.params;

    try {
      console.log(username, password);
    } catch (e) {
      console.trace(e);
      res.status(400).json({
        error: 'Unable to log in',
      });
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({
    message: 'Logged out',
  });
});

module.exports = router;
