const express = require('express');
const cors = require('cors');

const index = require('./api/index');
const problem = require('./api/problem');

const app = express();
app.use(cors());
app.use(index);
app.use('/problem', problem);

module.exports = app;