const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const persist = require('node-persist');
const passport = require('passport');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const env = require('dotenv');

env.config();

const index = require('./api/index');
const authApi = require('./api/auth');
const auth = require('./auth');

const whitelist = ['http://localhost:5000', 'https://accounts.google.com'];

/* Initialize cache */
const mediaItemCache = persist.create({
  dir: 'persist-mediaitemcache/',
  ttl: 55 * 60 * 1000, // 55 minutes
});
mediaItemCache.init();
const albumCache = persist.create({
  dir: 'persist-albumcache/',
  ttl: 10 * 60 * 1000, // 10 minutes
});
albumCache.init();
const storage = persist.create({ dir: 'persist-storage/' });
storage.init();

/* Initialize auth */
auth(passport);

/* Initialize use session */
const FileStore = sessionFileStore(session);
const sessionMiddleware = session({
  resave: true,
  saveUninitialized: true,
  store: new FileStore({}),
  secret: 'photo frame sample',
});

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(bodyParser.json());
// Enable user session handling.
app.use(sessionMiddleware);
// Set up passport and session handling.
app.use(passport.initialize());
app.use(passport.session());
app.use(index);
app.use('/auth', authApi);

module.exports = app;
