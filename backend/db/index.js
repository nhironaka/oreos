import { Pool } from 'pg';

import dbConfig from './config';

const pool = new Pool(dbConfig);
pool.connect();

export function query(sql, client = pool) {
  return new Promise((resolve, reject) => {
    client.query(sql, (error, results) => {
      if (error) {
        console.trace(error);
        reject(error);
      }
      resolve(results);
    });
  });
}

export function batchQuery(statements) {
  return pool.connect(async (err, client, done) => {
    if (err) {
      done();
      throw err;
    }
    try {
      const data = await Promise.all(statements.map(sql => query(sql, client)));
      done();
      return data;
    } catch (e) {
      done();
      throw e;
    }
  });
}
