import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/*', (req, res) => {
  console.log('here', req.session.user);
  res.sendFile(path.resolve(__dirname, '../../ui/src/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

export default router;
