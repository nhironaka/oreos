import persist from 'node-persist';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

export function initializeStorage(app) {
  /* Initialize cache */
  const mediaItemCache = persist.create({
    dir: 'cache/persist-mediaitemcache/',
    ttl: 55 * 60 * 1000, // 55 minutes
  });
  mediaItemCache.init();
  const albumCache = persist.create({
    dir: 'cache/persist-albumcache/',
    ttl: 10 * 60 * 1000, // 10 minutes
  });
  albumCache.init();
  const storage = persist.create({ dir: 'cache/persist-storage/' });
  storage.init();

  /* Initialize user session */
  const FileStore = sessionFileStore(session);
  const sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: new FileStore({}),
    secret: 'photo frame sample',
  });
  const userSession = session({
    key: 'user_sid',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 24 * 60 * 60 * 1000,
    },
  });

  // Enable user session handling.
  app.use(userSession);
  app.use(sessionMiddleware);

  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');
    }
    next();
  });
}
