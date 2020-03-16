const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  passport.use(
    new GoogleOAuthStrategy(
      {
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
        // Set the correct profile URL that does not require any additional APIs
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      (token, refreshToken, profile, done) => {
        console.log(token, refreshToken, profile, done);
        return done(null, { profile, token });
      }
    )
  );
};
