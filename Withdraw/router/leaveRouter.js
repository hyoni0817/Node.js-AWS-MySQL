const express = require('express');
const formidable = require('formidable');
/*url 검색하기*/
const url = require('url');

const router = express.Router();
const pool = require('../model/dbConnection.js');
const Leave = require('../model/memberLeave.js');


router.route('/leaveId')
	.post(deleteUser)


function deleteUser(req,res,next) {
	var date = new Date();
	const userId = req.body.userId;
	const inputDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

  if(!userId) return res.status(400).send({msg:'userId error'});

	Leave.delUserInfo(userId, inputDate, (err, result) => {
			if(err) return next(err);
			return res.send(result);
		});

}


module.exports = router;
