const moment = require('moment');

const STATUSES = {
  ATTEMPTED: 'ATTEMPTED',
  SOLVED: 'SOLVED',
};

function Problem(name, question, status = STATUSES.ATTEMPTED, solution = '') {
  this.name = name;
  this.question = question;
  this.solution = solution;
  this.status = status;

  function getAddProductSQL() {
    return `INSERT INTO PROBLEM(name, question, solution, status) \
                   VALUES('${this.name}', '${this.question}', '${this.solution}', '${this.status}')`;
  }
  this.getAddProductSQL = getAddProductSQL;
}

function getProblemByIdSQL(id) {
  return `SELECT * FROM PROBLEM WHERE ID=${id}`;
}

function updateProblemByIdSQL(problem) {
  const sql = [`UPDATE PROBLEM SET`];
  if (problem.question) {
    sql.push(`question=${problem.question},`);
  }
  if (problem.solution) {
    sql.push(`solution=${problem.solution},`);
  }
  if (problem.status) {
    if (!STATUSES[problem.status]) {
      throw new Error(
        `Problem status must be one of ${STATUSES.ATTEMPTED}, ${STATUSES.SOLVED}. You entered - ${problem.status}`
      );
    }
    sql.push(`status=${problem.status},`);
  }
  if (sql.length < 2) {
    throw new Error('Unable to update problem. Invalid fields.');
  }

  sql.push(`last_updated=${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  return sql.join(' ');
}

function deleteProblemByIdSQL(id) {
  return `DELETE FROM PROBLEM WHERE ID = ${id}`;
}

function getAllProblemsSQL() {
  return `SELECT * FROM PROBLEM`;
}

Problem.STATUSES = STATUSES;
Problem.deleteProblemByIdSQL = deleteProblemByIdSQL;
Problem.getProblemByIdSQL = getProblemByIdSQL;
Problem.updateProblemByIdSQL = updateProblemByIdSQL;
Problem.getAllProblemsSQL = getAllProblemsSQL;

module.exports = Problem;
