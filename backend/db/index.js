const { Pool } = require('pg');
const env = require('dotenv');

const init = require('./init');

env.config();

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const pool = new Pool(dbConfig);

init(dbConfig);
pool.connect();

function executeQuery(sql, callback, client = pool) {
  return client.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

function query(sql, callback) {
  return executeQuery(sql, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
}

async function batchQuery(statements, callback) {
  await pool.connect((err, client, done) => {
    if (err) {
      return callback(err);
    }
    const promises = Promise.all(statements.map(sql => (
      new Promise((resolve, reject) => {
        executeQuery(sql, (e, data) => {
          if (e) {
            reject(e);
          } else {
            resolve(data)
          }
        }, client)
      })
    )));

    return promises.then(data => {
      done();
      return callback(null, data);
    }).catch(e => {
      return callback(e);
    })
  })
}

module.exports = {
  query,
  batchQuery,
};
