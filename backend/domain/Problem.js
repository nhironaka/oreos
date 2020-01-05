const moment = require('moment');
const escape = require('pg-escape');

const STATUSES = {
  ATTEMPTED: 'ATTEMPTED',
  SOLVED: 'SOLVED',
};

function Problem(name, question, title, status = STATUSES.ATTEMPTED, solution = '') {
  this.name = name;
  this.question = question;
  this.title = title;
  this.solution = solution;
  this.status = STATUSES[status];

  function getAddProblemSQL() {
    return escape(`INSERT INTO PROBLEM(name, question, solution, status, title) \
                   VALUES('${this.name}', '${this.question}', '${this.solution}', 
                   '${this.status}', '${this.title}') RETURNING *;`);
  }
  this.getAddProblemSQL = getAddProblemSQL;
}

function getProblemByIdSQL(id) {
  return `SELECT * FROM PROBLEM WHERE ID=${id}`;
}

function updateProblemByIdSQL(id, problem) {
  const sql = [`UPDATE PROBLEM SET`];
  if (problem.question) {
    sql.push(`question='${problem.question}',`);
  }
  if (problem.solution) {
    sql.push(`solution='${problem.solution.replace(/'/g, '"')}',`);
  }
  if (problem.title) {
    sql.push(`title='${problem.title}',`);
  }
  if (problem.status) {
    if (!STATUSES[problem.status]) {
      throw new Error(
        `Problem status must be one of ${STATUSES.ATTEMPTED}, ${STATUSES.SOLVED}. You entered - ${problem.status}`
      );
    }
    sql.push(`status='${STATUSES[problem.status]}',`);
  }
  if (sql.length < 2) {
    throw new Error('Unable to update problem. Invalid fields.');
  }

  sql.push(`last_updated='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE ID=${id} RETURNING *;`);

  return escape(sql.join(' '));
}

function deleteProblemByIdSQL(id) {
  return `DELETE FROM PROBLEM WHERE ID = ${id}`;
}

function getAllProblemsSQL() {
  return `SELECT * FROM PROBLEM ORDER BY last_updated DESC`;
}

Problem.STATUSES = STATUSES;
Problem.deleteProblemByIdSQL = deleteProblemByIdSQL;
Problem.getProblemByIdSQL = getProblemByIdSQL;
Problem.updateProblemByIdSQL = updateProblemByIdSQL;
Problem.getAllProblemsSQL = getAllProblemsSQL;

module.exports = Problem;
