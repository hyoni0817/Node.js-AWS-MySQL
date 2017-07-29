const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const messageRouter = require('./router/messageRouter.js');

app.use(morgan('dev'));
app.use(messageRouter);


app.use( (err, req, res, next) => {
	res.send({error : err.message});
});

app.listen(4000);
