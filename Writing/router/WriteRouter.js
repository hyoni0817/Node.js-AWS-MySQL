const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const morgan = require('morgan');
const pool = require('../model/dbConnection.js');
const Writing = require('../model/writing.js');
const async = require('async');
var query = require('querystring');

router.route('/Writings')
	.get(showWriteList)
	.post(addNewWrite);

router.route('/Writings/delete')
	.post(deleteWrite)

router.route('/Writings/:writeId')
	.get(showWriteDetail)
	.post(editWrite);

function addNewWrite(req,res,next) {
	const username = req.body.username;
	const title =req.body.title;
	const contents = req.body.contents;

	Writing.saveWrite(username, title, contents, (err, result) => {
			if(err) return next(err);
			res.send(result);
		});
}//새로운 드라이버 글 등록하고 저장하기


function showWriteList(req, res) {
	Writing.getWriList( req.query, (err, result) => {
		if(err) {
			res.status(500).send({msg:'getWriList fail'});
			return;
		}
		res.send(result);
	});
};


function deleteWrite (req, res, next) {
	const writeId = req.body.writeId;
	const userId = req.body.userId;

	Writing.eraseWrite ( writeId, userId, (err, result) => {
		if(err) return next(err);
	res.send(result);
	});
}

function editWrite (req, res, next) {
	const writeId = req.params.writeId;
	const title = req.body.title;
	const contents = req.body.contents;


	Writing.updateWrite(write_id, title, contents, (err, result) => {
			if(err) return next(err);
		res.send(result);
		});
}

function showWriteDetail(req, res) {
	const writeId = req.params.writeId;

	Writing.getWriteDetail(writeId, (err, result)=> {
		if(err) {
			res.status(500).send({msg:'getWriteDetail fail'});
			return;
		}

		if(result)
		{
			return res.send(result);
		}
		else{
			res.status(404).send({msg:'page fail'})
		}

	});
}

module.exports = router;
