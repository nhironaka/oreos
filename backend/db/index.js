const { Pool } = require('pg');
const env = require('dotenv');

env.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect();

function executeQuery(sql, callback) {
  return pool.query(sql, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

function query(sql, callback) {
  executeQuery(sql, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
}

module.exports = {
  query,
};
