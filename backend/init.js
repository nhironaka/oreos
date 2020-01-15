const { Client } = require('pg');
const { createDb, migrate } = require('postgres-migrations');
const path = require('path');

async function init() {
  const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  };
  const baseClient = new Client({
    ...dbConfig,
    database: 'postgres',
  });
  try {
    await baseClient.connect();

    const dbExists = await baseClient.query(`SELECT * FROM PG_DATABASE WHERE DATNAME='node'`);
    if (!dbExists.rows.length) {
      await createDb(process.env.DB_NAME, { baseClient });
    }
  } catch (e) {
    await baseClient.end();
    console.error('Unable to create migration');
    console.trace(e);
    return;
  } finally {
    baseClient.end();
  }
  const client = new Client(dbConfig);

  try {
    await client.connect();
    await migrate({ client }, path.resolve(__dirname, './migrations'));
  } catch (e) {
    console.error('Unable to create migration');
    console.trace(e);
  } finally {
    await client.end();
  }
}

module.exports = init;
