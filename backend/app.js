const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const index = require('./api/index');
const problem = require('./api/problem');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(index);
app.use('/problem', problem);

module.exports = app;