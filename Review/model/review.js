const pool = require('./dbConnection.js');
class Reviews {}

Reviews.saveReviewWri = function(sendUser, receiveUser, stars, reviewText, reviewDate, callback){
	pool.getConnection( (err, conn) => {
		if (err) return callback (err, null);
		const sql = 'insert into review set ?';
		const params = {SEND_ID : sendUser, RECEIVE_ID : receiveUser, STARS: stars, REVIEW_TEXT: reviewText, REVIEW_DT: reviewDate};
		conn.query(sql, params, (err, result) => {
			if(err) {
				conn.release();
				return callback(err, null);
			}
			conn.release();
			callback(null, {msg : 'Save reviews successfully'});

		});
	});
}


Reviews.getReviewList = function(id, params, callback) {
	pool.getConnection ( (err, conn) => {
		if(err) return callback(err, null);
		if(params == 'sent'){
			//보낸 리뷰함(sent review box)
      //탈퇴한 사람의 리뷰도 남깁니다.(Included those who have withdrawn.)

			const sql = 'select r.WRI_NO, r.RECEIVE_ID, r.SEND_ID, r.STARS, r.REVIEW_TEXT, r.REVIEW_DT, (select PRO_IMG from users where USER_ID = RECEIVE_ID ) as RECEIVER_img, (select NICKNAME from users where USER_ID = RECEIVE_ID ) as RECEIVER_NICK from review r, users u where u.user_id = r.RECEIVE_ID and r.SEND_ID = ?'
			const sql2 = ' union '
			const sql3 = 'select r.WRI_NO, r.RECEIVE_ID, r.SEND_ID, r.STARS, r.REVIEW_TEXT, r.REVIEW_DT, (select PRO_IMG from withdraw where USER_ID = RECEIVE_ID ) as RECEIVER_img, (select NICKNAME from withdraw where USER_ID = RECEIVE_ID ) as RECEIVER_NICK from review r, users u, withdraw w where u.user_id = ? and r.SEND_ID = ? and w.USER_ID = r.RECEIVE_ID order by WRI_NO desc;'

			conn.query(sql+sql2+sql3,[id,id,id], (err, results) =>{
				if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
				}
				if(!results.length)
				{
					conn.release();
					callback(null, {msg: 'no review'})
				}else{
					const obj = {
						msg:'Reviews exist',
						count : results.length,
						data : results
					}
					conn.release();
					callback(null, obj);
				}
			});

		}
		else if(params == 'received'){
			//받은 리뷰함(received review box)
			//탈퇴한 사람의 리뷰도 남깁니다.(Included those who have withdrawn.)

			const sql = 'select r.WRI_NO, r.RECEIVE_ID, r.SEND_ID, r.STARS, r.REVIEW_TEXT, r.REVIEW_DT, (select PRO_IMG from users where USER_ID = SEND_ID ) as SENDER_IMG, (select NICKNAME from users where USER_ID = SEND_ID ) as SENDER_NICK from review r, users u where u.USER_ID = r.SEND_ID and r.RECEIVE_ID = ?'
			const sql2 = ' union '
			const sql3 = 'select r.WRI_NO, r.RECEIVE_ID, r.SEND_ID, r.STARS, r.REVIEW_TEXT, r.REVIEW_DT, (select PRO_IMG from withdraw where USER_ID = SEND_ID ) as SENDER_IMG, (select NICKNAME from withdraw where USER_ID = SEND_ID ) as SENDER_NICK from review r, users u, withdraw w where u.USER_ID = ? and r.RECEIVE_ID = ? and w.USER_ID = r.SEND_ID order by WRI_NO desc;'
			conn.query( sql+sql2+sql3,[id, id, id], (err, results) =>{
				if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
				}
				if(!results.length)
				{
					conn.release();
					callback(null, {msg: 'no review'})
				}else
				{
					const obj = {
						msg:'Reviews exist',
						count : results.length,
						data : results
					}
					conn.release();
					callback(null, obj);
				}
			});
		}
	});
}


module.exports = Reviews;
