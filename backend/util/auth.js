
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function hashPassword(password) {
  return new Promise((resolve, reject) => bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      reject(err);
    } else {
      resolve(hash);
    }
  }));
}

export function checkPassword(password, hash) {
  return new Promise((resolve, reject) => bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));
}

export function sessionChecker(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    res.status(400).json({
      error: new Error('User not logged in.'),
    });
  } else {
    next();
  }
}
