const express = require('express');
const db = require('../db/index');
const Problem = require('../domain/Problem');

const router = express.Router();

// Handles url GET:/problems
router.get('/', (req, res) => {
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

// Handles url POST:/problems/:id
router.post('/:problemId', (req, res) => {
  const { problemId } = req.params;

  db.query(Problem.updateProblemByIdSQL(problemId, req.body), (err, data) => {
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

// Handles url POST:/problems/:id
router.post('/', (req, res) => {
  const { name, question, title, status, difficulty, solution } = req.body;
  const problem = new Problem(name, question, title, difficulty, status, solution);

  db.query(problem.getAddProblemSQL(problem), (err, data) => {
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
router.delete('/:problemId', (req, res) => {
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

// Handles url GET:/problems
router.get('/filter', (req, res) => {
  
});


module.exports = router;
