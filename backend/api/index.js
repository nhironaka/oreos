const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../ui/dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
