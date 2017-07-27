const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const leaveRouter = require('./router/leaveRouter.js');


app.use(morgan('dev'));
app.use(leaveRouter);


app.use( (err, req, res, next) => {
	res.send({error : err.message});
});

app.listen(4000);
