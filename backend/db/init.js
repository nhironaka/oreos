import { Client } from 'pg';
import { createDb, migrate } from 'postgres-migrations';

import '../migrations/0001_create-initial-tables';
import config from './config';

async function createDatabase() {
  const client = new Client({
    ...config,
    database: 'postgres',
  });
  try {
    await client.connect();

    const dbExists = await client.query(
      'SELECT * FROM PG_DATABASE WHERE DATNAME=\'node\''
    );
    if (!dbExists.rows.length) {
      await createDb(process.env.DB_NAME, { client });
    }
  } catch (e) {
    await client.end();
    throw e;
  } finally {
    client.end();
  }
}

async function createMigration() {
  const client = new Client(config);

  try {
    await client.connect();
    await migrate({ client }, './backend/migrations');
  } catch (e) {
    await client.end();
    console.trace(e);
  } finally {
    await client.end();
  }
}

export async function init(dbConfig) {
  await createDatabase(dbConfig);
  await createMigration(dbConfig);
}

(() => init())();
