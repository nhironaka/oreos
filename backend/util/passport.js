import passport from 'passport';
import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { Strategy as LocalStrategy } from 'passport-local';

import { findOne } from '../repository/user';
import { checkPassword } from './auth';
import { getUserSchema } from '../schemas/user';

function GoogleAuth(p) {
  p.serializeUser((user, done) => done(null, user));
  p.deserializeUser((user, done) => done(null, user));
  p.use(
    new GoogleOAuthStrategy(
      {
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/callback/google`,
        // Set the correct profile URL that does not require any additional APIs
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      (token, refreshToken, profile, done) => {
        console.log(token, refreshToken, profile);
        return done(null, { token, refreshToken, profile });
      }
    )
  );
}

function SpotifyAuth(p) {
  p.use(
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http://localhost:9000/auth/callback/spotify',
      },
      (accessToken, refreshToken, expiresIn, profile, done) => {
        console.log(accessToken, refreshToken, expiresIn, profile);
        return done(null, {
          accessToken,
          refreshToken,
          expiresIn,
          profile,
        });
      }
    )
  );
}

function localAuth(p) {
  p.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await findOne({ username });

      if (!user) {
        return done(new Error('Incorrect username.'));
      }
      const passwordMatch = await checkPassword(password, user.password);
      if (!passwordMatch) {
        return done(new Error('Incorrect password.'));
      }
      return done(null, getUserSchema(user));
    })
  );
}

export function initializePassport(app) {
  // Set up passport and session handling.
  localAuth(passport);
  GoogleAuth(passport);
  SpotifyAuth(passport);
  app.use(passport.initialize());
  app.use(passport.session());
}
