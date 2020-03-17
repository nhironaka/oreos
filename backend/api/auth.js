import express from 'express';
import passport from 'passport';
import { SCOPE } from '../constants/user';

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!data) {
      return res.status(400).json({
        error: 'Unable to log in',
      });
    }
    res.cookie('user_sid', data);
    return res.status(200).json({ data });
  })(req, res);
});

router.get('/login', (req, res) => {
  console.log(req.cookies, req.session.passport);
  if (req.session.user) {
    res.status(200).json({ data: req.session.user });
  } else {
    res.status(200).json({});
  }
});

router.get('/logout', (req, res) => {
  console.log(req.cookies, req.session);
  req.session.destroy();
  res.status(200).json({
    message: 'Logged out',
  });
});

router.get('/:authType', (req, res, done) => {
  const { authType } = req.params;
  passport.authenticate(authType, {
    scope: SCOPE[authType],
    failureFlash: true, // Display errors to the user.
    session: true,
  })(req, res, (err, data) => {
    done(err, data);
  });
});

router.get('/callback/:authType', (req, res) => {
  const { authType } = req.params;
  passport.authenticate(authType, async (err, data) => {
    console.log(err, data);
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    if (!data) {
      res.status(400).json({
        error: 'Unable to log in',
      });
    }
  })(req, res);
});

export default router;
