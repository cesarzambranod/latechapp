const express = require('express');
const morgan = require('morgan');
const path=require('path');
const app = expres();

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(require('./router/index'));

module.exports=app;