// Create enums
const CREATE_USER_STATUS_ENUM = `
DO $$ BEGIN
  CREATE TYPE USER_STATUS as ENUM ('ACTIVE', 'INACTIVE');
EXCEPTION
  WHEN duplicate_object THEN null;
  END $$;
  `;

// Create tables
const CREATE_USER_TABLE = `
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username varchar(64) UNIQUE NOT NULL,
    display_name varchar(64) NOT NULL,
    password varchar(123) NOT NULL,
    status USER_STATUS NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

module.exports = {
  generateSql: () => `
    ${CREATE_USER_STATUS_ENUM}
    ${CREATE_USER_TABLE}
  `,
};
