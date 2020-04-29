const express = require('express');
const morgan = require('morgan');
const path=require('path');
const app = express();

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(require('./routes/index'));

module.exports=app;