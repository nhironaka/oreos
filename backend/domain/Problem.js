const moment = require('moment');
const escape = require('pg-escape');

const { PROBLEM_STATUS, PROBLEM_DIFFICULTY } = require('../constants/problem');

function Problem(name, question, title, difficulty, status = PROBLEM_STATUS.ATTEMPTED, solution = '') {
  this.name = name;
  this.question = question;
  this.title = title;
  this.solution = solution;
  this.status = PROBLEM_STATUS[status];
  this.difficulty = PROBLEM_DIFFICULTY[difficulty];

  function getAddProblemSQL() {
    return `INSERT INTO PROBLEM(name, question, solution, status, title, difficulty) \
                   VALUES('${this.name}', '${this.question}', '${this.solution}', 
                   '${this.status}', '${this.title}', '${this.difficulty}') RETURNING *;`;
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
    if (!PROBLEM_STATUS[problem.status]) {
      throw new Error(
        `Problem status must be one of ${PROBLEM_STATUS.ATTEMPTED},
         ${PROBLEM_STATUS.SOLVED}. You entered - ${problem.status}`
      );
    }
    sql.push(`status='${PROBLEM_STATUS[problem.status]}',`);
  }
  if (problem.difficulty) {
    if (!PROBLEM_DIFFICULTY[problem.difficulty]) {
      throw new Error(
        `Problem difficulty must be one of ${PROBLEM_DIFFICULTY.EASY}, ${PROBLEM_DIFFICULTY.MEDIUM}, 
        ${PROBLEM_DIFFICULTY.HARD}. You entered - ${problem.difficulty}`
      );
    }
    sql.push(`difficulty='${PROBLEM_DIFFICULTY[problem.difficulty]}',`);
  }
  if (sql.length < 2) {
    throw new Error(`Unable to update problem. Invalid fields - ${Object.values(problem).join(', ')}`);
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

Problem.PROBLEM_STATUS = PROBLEM_STATUS;
Problem.deleteProblemByIdSQL = deleteProblemByIdSQL;
Problem.getProblemByIdSQL = getProblemByIdSQL;
Problem.updateProblemByIdSQL = updateProblemByIdSQL;
Problem.getAllProblemsSQL = getAllProblemsSQL;

module.exports = Problem;
