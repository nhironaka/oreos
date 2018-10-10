const express = require('express');
const db = require('../db/index');
const Problem = require('../domain/Problem');

const router = express.Router();

// Handles url GET:/problems
router.get('/', (req, res, next) => {
  db.query(Problem.getAllProblemsSQL(), (err, data) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
});

// Handles url POST:/problems/add
router.post('/', (req, res, next) => {
  const { name, question, status, solution } = req.params;
  const problem = new Problem(name, question, status, solution);

  db.query(problem.getAddProblemSQL(), (err, data) => {
    res.status(200).json({
      data,
    });
  });
});

// Handles url GET:/problems/:id
router.get('/:problemId', (req, res, next) => {
  const { problemId } = req.params;

  db.query(Problem.getProblemByIdSQL(problemId), (err, data) => {
    console.log(err, data)
    if (!err) {
      if (data && data.length > 0) {
        res.status(200).json({
          message: 'Problem found.',
          data,
        });
      } else {
        res.status(200).json({
          message: 'Problem Not found.',
        });
      }
    }
  });
});

// Handles url DELETE:/problems/:id
router.delete('/:problemId', (req, res, next) => {
  const { problemId } = req.params;

  db.query(Problem.deleteProblemByIdSQL(problemId), (err, data) => {
    if (!err) {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: `Problem deleted with id = ${problemId}.`,
          affectedRows: data.affectedRows,
        });
      } else {
        res.status(200).json({
          message: 'Problem Not found.',
        });
      }
    }
  });
});

module.exports = router;
