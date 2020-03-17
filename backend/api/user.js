import express from 'express';

import {
  updateUserById, addUser, deleteUserById, findOne,
} from '../repository/user';

const router = express.Router();

// Handles url POST:/user/:id
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await updateUserById(userId, req.body);

    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
});

// Handles url POST:/user
router.post('/', async (req, res) => {
  try {
    const data = await addUser(req.body);

    req.session.user = data;
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// Handles url GET:/user
router.get('/', (req, res) => {
  const { username } = req.params;

  try {
    const data = findOne({ username });
    if (data && data.length > 0) {
      res.status(200).json({
        message: 'User found.',
        data,
      });
    } else {
      res.status(200).json({
        message: 'User Not found.',
      });
    }
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// Handles url DELETE:/user/:id
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;


  try {
    const data = deleteUserById(userId);
    if (data && data.affectedRows > 0) {
      res.status(200).json({
        message: `User deleted with id = ${userId}.`,
        affectedRows: data.affectedRows,
      });
    } else {
      res.status(200).json({
        message: 'User Not found.',
      });
    }
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

export default router;
