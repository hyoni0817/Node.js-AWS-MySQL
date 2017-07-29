const pool = require('./dbConnection.js');
var queyrystring = require('querystring');
class Messages {}

//메시지 보내기(To send message)
Messages.saveMsgWri = function(sender, receiver, msgText, msgDate, callback){
	pool.getConnection( (err, conn) => {
		if (err) return callback (err, null);
		const sql = 'insert into message set ?';
		const params = {SEND_ID : sender, RECEIVE_ID : receiver, MSG_TEXT: msgText, MSG_DT: msgDate};
		console.log(params);
		conn.query(sql, params, (err, result) => {
			if(err) {
				conn.release();
				return callback(err, null);
			}
			conn.release();
			callback(null, {msg : 'save message success'});

		});
	});
}

//메시지 목록 불러오기(To get message list)
Messages.getMsgList = function(userId, query, callback) {
	pool.getConnection ( (err, conn) => {
		if(err) return callback(err, null);

		if(query.box == 'sent'){
			const sql = 'select m.MSG_NO, m.RECEIVE_ID, m.SEND_ID, m.MSG_TEXT, DATE_FORMAT(m.MSG_DT,"%Y-%m-%d %H:%i:%s") as MSG_DT, m.READ_ST, (select PRO_IMG from users where USER_ID = RECEIVE_ID ) as RECEIVER_USER_IMG, (select NICKNAME from users where USER_ID = RECEIVE_ID ) as RECEIVER_NICKNAME from message m, users u where u.USER_ID = m.RECEIVE_ID and m.SEND_ID = ?';
			const sql2 = ' union ';
			const sql3 = 'select m.MSG_NO, m.RECEIVE_ID, m.SEND_ID, m.MSG_TEXT, DATE_FORMAT(m.MSG_DT,"%Y-%m-%d %H:%i:%s") as MSG_DT, m.READ_ST, (select PRO_IMG from withdraw where USER_ID = RECEIVE_ID ) as RECEIVER_USER_IMG, (select NICKNAME from withdraw where USER_ID = RECEIVE_ID ) as RECEIVER_NICKNAME from message m, users u, withdraw w where u.USER_ID = ? and m.SEND_ID = ? and w.USER_ID = m.RECEIVE_ID order by MSG_DT desc;';

			conn.query(sql+sql2+sql3,[userId,userId,userId], (err, results) =>{
				if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
				}

				const obj = {
					count : results.length,
					data : results
				}
				conn.release();
				callback(null, obj);

			});
		}
		else if(query.box == 'received'){

			const sql1 = 'update message m, users u set m.READ_ST = 1 where m.READ_ST = 0 and u.USER_ID = ? and m.RECEIVE_ID = ?;'
			const sql2 = 'select m.MSG_NO, m.RECEIVE_ID, m.SEND_ID, m.MSG_TEXT, DATE_FORMAT(m.MSG_DT,"%Y-%m-%d %H:%i") as MSG_DT, m.READ_ST, (select PRO_IMG from users where USER_ID = SEND_ID) as SENDER_IMG, (select NICKNAME from users where USER_ID = SEND_ID ) as SENDER_NICKNAME from message m, users u where u.USER_ID = m.SEND_ID and m.RECEIVE_ID = ?'
			const sql3 = ' union ';
			const sql4 = 'select m.MSG_NO, m.RECEIVE_ID, m.SEND_ID, m.MSG_TEXT, DATE_FORMAT(m.MSG_DT,"%Y-%m-%d %H:%i") as MSG_DT, m.READ_ST, (select PRO_IMG from withdraw where USER_ID = SEND_ID) as SENDER_IMG, (select NICKNAME from withdraw where USER_ID = SEND_ID ) as SENDER_NICKNAME from users u, message m, withdraw w where u.USER_ID = ? and m.RECEIVE_ID = ? and w.USER_ID = m.SEND_ID order by MSG_DT desc;';
			conn.query(sql1+sql2+sql3+sql4,[userId, userId, userId, userId, userId], (err, results) =>{
				if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
				}

				const obj = {
					count : results.length,
					data : results[1]
				}
				conn.release();
				callback(null, obj);

			});
		}
	});
}

//메시지 여러개 선택해서 삭제하기(To delete multiple messages)
Messages.delMsgInfo = function(userId, box, messageNo, callback){
	pool.getConnection( (err, conn) => {
		if (err) return callback (err, null);
		var numArr = messageNo.split(',');
		var numAdd = conn.escape(numArr);

		if(box =='sent'){
					const sql = 'delete from message where MSG_NO in ('+numArr+') and SEND_ID = ?';
					conn.query(sql, [userId], (err, result) => {
					if(err) {
						conn.release();
						return callback(err, null);
					}
					console.log(sql);
					callback(null, {msg : 'Mesage in sentBox delete success'});
					conn.release();
				});
		}
		else if(box =='received'){
			const sql = 'delete from message where MSG_NO in (?) and RECEIVE_ID = ?';

			conn.query(sql,[messageNo, userId],(err, result) => {
				if(err) {
					conn.release();
					return callback(err, null);
				}
				callback(null, {msg : 'Message in receiveBox delete success'});
				conn.release();
			});
		}else {
			return callback(null, {msg : 'box name error'})
		}
	});
}

module.exports = Messages;
