const { Client } = require('pg');
const { createDb, migrate } = require('postgres-migrations');
const path = require('path');

async function createDatabase(config) {
  const client = new Client({
    ...config,
    database: 'postgres',
  });
  try {
    await client.connect();

    const dbExists = await client.query(`SELECT * FROM PG_DATABASE WHERE DATNAME='node'`);
    if (!dbExists.rows.length) {
      await createDb(process.env.DB_NAME, { client });
    }
  } catch (e) {
    console.error('Unable to create database');
    console.trace(e);
    await client.end();
    throw e;
  } finally {
    client.end();
  }
}

async function createMigration(config) {
  const client = new Client(config);

  try {
    await client.connect();
    await migrate({ client }, path.resolve(__dirname, '../migrations'));
  } catch (e) {
    console.error('Unable to create migration');
    console.trace(e);
  } finally {
    await client.end();
  }
}

async function init(dbConfig) {
  await createDatabase(dbConfig);
  await createMigration(dbConfig);

}

module.exports = init;
