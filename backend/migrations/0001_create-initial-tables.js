// Create enums
const CREATE_PROBLEM_STATUS_ENUM = `
    DO $$ BEGIN
        CREATE TYPE PROBLEM_STATUS as ENUM ('ATTEMPTED', 'SOLVED');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;
`;
const CREATE_DIFFICULTY_ENUM = `
    DO $$ BEGIN
        CREATE TYPE PROBLEM_DIFFICULTY as ENUM ('EASY', 'MEDIUM', 'HARD');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;
`;

// Create tables
const CREATE_PROBLEM_TABLE = `
CREATE TABLE IF NOT EXISTS problem (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    question TEXT NOT NULL,
    solution TEXT,
    status PROBLEM_STATUS NOT NULL,
    difficulty PROBLEM_DIFFICULTY NOT NULL,
    created TIMESTAMP NOT NULL,
    last_updated TIMESTAMP
);`;

module.exports = {
  generateSql: () => `
        ${CREATE_PROBLEM_STATUS_ENUM}
        ${CREATE_DIFFICULTY_ENUM}
        ${CREATE_PROBLEM_TABLE}
    `,
};
