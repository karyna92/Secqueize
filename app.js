const express = require('express');
const router = require('./routes');
const errorHandler=require('./errorHandler')

const app = express();

// app.use((req, res, next) => {
//   let data = '';
//   req.on('data', (chunk) => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     console.log('Raw body:', data);
//     next();
//   });
// });


app.use(express.json());

app.use('/api', router);
app.use(errorHandler)
module.exports = app;
