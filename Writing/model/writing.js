const pool = require('./dbConnection.js');
var request = require('request');
class Writing {}

Writing.saveWrite = (userId, username, title, inputDate, contents, callback) => {
	pool.getConnection( (err, conn) => {
		if (err) return callback (err, null);
		const sql = 'insert into board set ?';
		const params = {USER_ID : userId, USERNAME: username, TITLE : title, DATE : inputDate, CONTENTS : contents};

				conn.query(sql, params, (err, results) => {
					if(err) {
						conn.release();
						return callback(err, null);
					}
					//console.log('writing success')
					return callback(null, {msg : 'write insert success'});
					conn.release();
				});
	});
}

Writing.getWriList = function(query, callback) {
	pool.getConnection ((err, conn) => {
		if(err) return callback(err, null);
		//console.log(query);

		const sql = 'select WRITE_ID, USERNAME, TITLE from board order by WRITE_ID desc;'
		conn.query(sql, (err, result) => {

			const obj = {
				count : result.length,
				data : result
			}
			console.log(result);
			callback(null, obj);
			conn.release();
			});
		});
	}

//To delete a text
Writing.eraseWrite = (writeId, userId, callback) => {
	pool.getConnection( (err, conn) => {
		const sql = 'delete from board where WRITE_ID = ? and USER_ID = ? ';
		conn.query(sql, [writeId, userId], (err, result) => {
			if(err) {
				conn.release();
				return callback(err, null);
			}
			callback(null, {msg : 'writing delete success'});
			conn.release();
		})
	})
}

Writing.updateWrite = (writeId, title, contents, userId, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
		var data = {title : title, contents : contents};
		var sql = 'update board set ? where WRITE_ID = ? and USER_ID = ?';

		conn.query(sql,[data, writeId, userId], (err, result) => {
			if(err) {
				conn.release();
				return callback(err,null);
			}
			callback(null, {msg: 'writing update success'})
			conn.release();
		});
	});
}

Writing.getWriteDetail = (writeId, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
		conn.query('select * from board where WRITE_Id = ?',writeId, (err,results) => {
			if(err) {
				console.error('Error : ', err);
				callback(err, null);
				conn.release();
				return;
			}

			const obj = {
				count : results.length,
				data : results[0]
			}
			callback(null, obj);
			conn.release();
		});
	});
}

module.exports = Writing;
