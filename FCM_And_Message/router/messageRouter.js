const express = require('express');
const formidable = require('formidable');

const router = express.Router();
const pool = require('../model/dbConnection.js');
const Messages = require('../model/message.js');
const Fcmpush = require('../model/fcmPush.js');

router.route('/:userId/message')
	.get(showMsgList);
//http://localhost:4000/:userId/message?box=received
//http://localhost:4000/Hwang25/message?box=sent

router.route('/message')
	.post(addNewMsgWri);

router.route('/message/delete')
	.post(deleteMsg);

//메시지 전송하기(To send messages)
function addNewMsgWri(req,res,next) {
	var date = new Date();
	const sender = req.body.sender;
	const msgText = req.body.msgText;
	const msgDate =  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+ ":" + date.getSeconds(); //자바스크립트로 고치기
	const receiver = req.body.receiver;

  if(!sender) return res.status(400).send({msg:'sender error'});
  if(!msgText) return res.status(400).send({msg:'msgText error'});
  if(!receiver) return res.status(400).send({msg:'receiver error'});

	Messages.saveMsgWri(sender, receiver, msgText, msgDate, (err, result) => {
			if(err) return next(err);

			//상대방에게 메시지 도착 푸시 알림 보내기(Send message arrival push message to the recipient.)
			Fcmpush.sendMsgPush(receiver, sender, (err, result) => {
				res.send({msg: 'Message send and push success'});
			});
	});
}

//받은 메시지와 보낸 메시지 확인하기(Sent messages and received message check)
function showMsgList(req, res) {
	var userId = req.params.userId;
	Messages.getMsgList( userId, req.query, (err, result) => {
		if(err) {
			res.status(500).send({msg:'getMsgList fail. Check host, portnumber, etc. in model/dbConnection.js file.'});
			return;
		}
		res.send(result);
	});
};

//메시지 삭제하기(Delete messages)
function deleteMsg(req, res, next) {
	const userId = req.body.userId;
	const box = req.body.box;
	const messageNo = req.body.messageNo;

  if(!userId) return res.status(400).send({msg:'userId error'});
  if(!box) return res.status(400).send({msg:'box error'});
  if(!messageNo) return res.status(400).send({msg:'messageNo error'});

	Messages.delMsgInfo(userId, box, messageNo, (err, result) => {
			if(err){
				res.status(500).send({msg:'delMsgInfo fail. Check host, portnumber, etc. in model/dbConnection.js file.'});
				return;
			}
			res.send(result);
		});
}

module.exports = router;
