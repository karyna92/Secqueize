const express = require('express');
const router = require('./routes');
const errorHandler=require('./errorHandler')
const { STATIC_PATH } = require('./config/path.configs.js');

const app = express();



app.use(express.json());

app.use(express.static(STATIC_PATH));

app.use('/api', router);

app.use(errorHandler)
module.exports = app;
