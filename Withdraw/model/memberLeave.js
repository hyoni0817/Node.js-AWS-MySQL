const pool = require('./dbConnection.js');
class Leave {}

Leave.delUserInfo = (userId, inputDate, callback) => {
	pool.getConnection( (err, conn) => {
		const sql1 = 'select NICKNAME, PRO_IMG from users where USER_ID = ?;'
		const sql2 =  'insert into withdraw set ?;' //파라미터로 값 보내기
		const sql3 = 'delete from users where USER_ID = ?;'

		conn.query(sql1, userId, (err, result) => {
			if(err) {
				conn.release();
				return callback(err, null);
			}
			console.log(result)
			var nickname = result[0].NICKNAME;
			var proImg = result[0].PRO_IMG;
			//db에 들어가는 필드를 insert into 할 떄 하나도 빠짐없이 다 넣어줘야 한다.
			console.log(userId, nickname, proImg );
			var params = { USER_ID : userId, NICKNAME : nickname, PRO_IMG : proImg, LEAVE_DT : inputDate };

			conn.query(sql2+sql3, [params, userId], (err, result) => {
				if(err) {
					conn.release();
					return callback(err, null);
				}
				conn.release();
				callback(null, { msg : 'withdrawal success'})
			})
		})
	})
}

module.exports = Leave;
