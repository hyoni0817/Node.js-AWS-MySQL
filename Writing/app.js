const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const WriteRouter = require('./router/WriteRouter.js');

const pool = require('./model/dbConnection.js');
const Users = require('./model/users.js');


app.use(morgan('dev'));
app.use(WriteRouter);


app.use( (err, req, res, next) => {
	res.send({error : err.message});
});

app.listen(4000);
