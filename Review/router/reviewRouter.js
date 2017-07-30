const express = require('express');
const formidable = require('formidable');

const router = express.Router();
const pool = require('../model/dbConnection.js');
const Reviews = require('../model/review.js');

router.route('/user/review')
	.post(addNewReview);

router.route('/user/:userId/review/:box')
	.get(showReviewList);

function addNewReview(req,res,next) {
	var date = new Date();

	const sendUser = req.body.sendUser;
	const reviewText = req.body.reviewText;
	const reviewDate =  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
	const stars = req.body.stars;
	const receiveUser = req.body.receiveUser; //상세 글 보기의 글쓴이의 아이디를 요청 받는다.

	if(!sendUser) return res.status(400).send({msg: 'send_user error'});
	if(!reviewText) return res.status(400).send({msg: 'reviewText error'});
	if(!stars) return res.status(400).send({msg: 'stars error'});
	if(!receiveUser) return res.status(400).send({msg: 'receiveUser error'});

	Reviews.saveReviewWri(sendUser, receiveUser, stars, reviewText, reviewDate, (err, result) => {
			if(err) return next(err);
			res.send(result);
		});
}

function showReviewList(req, res) {
	var id = req.params.userId;
	var box = req.params.box;

	if(!id) return res.status(400).send({msg: 'userId error'});
	if(!box) return res.status(400).send({msg: 'box error'});

	Reviews.getReviewList( id, box, (err, result) => {
		if(err) {
			res.status(500).send({msg:message});
			return;
		}
		res.send(result);
	});
};



module.exports = router;
