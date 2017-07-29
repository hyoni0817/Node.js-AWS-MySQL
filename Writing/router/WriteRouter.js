const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const morgan = require('morgan');
const pool = require('../model/dbConnection.js');
const Writing = require('../model/writing.js');
const async = require('async');
var query = require('querystring');

router.route('/board')
	.get(showWriteList)
	.post(addNewWrite);

router.route('/board/delete')
	.post(deleteWrite)

router.route('/board/:writeId')
	.get(showWriteDetail)
	.post(editWrite);

function addNewWrite(req,res,next) {
	var date = new Date();

	const userId = req.body.userId;
	const username = req.body.username;
	const title =req.body.title;
	const contents = req.body.contents;
	const inputDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

	if(!username) return res.status(400).send({msg:'username error'});
	if(!title) return res.status(400).send({msg:'title error'});
	if(!contents) return res.status(400).send({msg:'contents error'});
	if(!userId) return res.status(400).send({msg:'userId error'});

	Writing.saveWrite(userId, username, title, inputDate, contents, (err, result) => {
			if(err) return next(err);
			res.send(result);
		});
}


function showWriteList(req, res) {
	Writing.getWriList( req.query, (err, result) => {
		if(err) {
			res.status(500).send({msg:'getWriList fail. Check host, portnumber, etc. in model/dbConnection.js file.'});
			return;
		}
		res.send(result);
	});
};


function deleteWrite (req, res, next) {
	const writeId = req.body.writeId;
	const userId = req.body.userId;

	if(!writeId) return res.status(400).send({msg:'writeId error'});
	if(!userId) return res.status(400).send({msg:'userId error'});

	Writing.eraseWrite ( writeId, userId, (err, result) => {
		if(err) return next(err);
	res.send(result);
	});
}

function editWrite (req, res, next) {
	const writeId = req.params.writeId;
	const title = req.body.title;
	const contents = req.body.contents;
	const userId = req.body.userId;

	if(!writeId) return res.status(400).send({msg:'writeId error'});
	if(!title) return res.status(400).send({msg:'title error'});
	if(!contents) return res.status(400).send({msg:'contents error'});
	if(!userId) return res.status(400).send({msg:'userId error'});

	Writing.updateWrite(writeId, title, contents, userId, (err, result) => {
			if(err) return next(err);
		res.send(result);
		});
}

function showWriteDetail(req, res) {
	const writeId = req.params.writeId;

	if(!writeId) return res.status(400).send({msg:'writeId error'});

	Writing.getWriteDetail(writeId, (err, result)=> {
		if(err) {
			res.status(500).send({msg:'getWriteDetail fail. Check host, portnumber, etc. in model/dbConnection.js file.'});
			return;
		}

		if(result)
		{
			return res.send(result);
		}
		else{
			res.status(404).send({msg:'page fail. Check host, portnumber, etc. in model/dbConnection.js file.'})
		}

	});
}

module.exports = router;
