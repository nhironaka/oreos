const { createDb, migrate } = require('postgres-migrations');
const path = require('path');

async function init(pool) {
  const client = await pool.connect();

  try {
    const dbExists = await client.query(`SELECT * FROM PG_DATABASE WHERE DATNAME='node'`);
    if (!dbExists.rows.length) {
      await createDb(process.env.DB_NAME, { client });
    }
  } catch (e) {
    await client.release();
    console.log('Unable to create migration');
    console.trace(e);
    return;
  }

  try {
    await migrate({ client }, path.resolve(__dirname, './migrations'));
  } catch (e) {
    console.log('Unable to create migration');
    console.trace(e);
  } finally {
    await client.release();
  }
}

module.exports = init;
