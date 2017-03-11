const pool = require('./dbConnection.js');
var request = require('request');
class Writing {}

Writing.saveWrite = (userId, username, title, contents, callback) => {
	pool.getConnection( (err, conn) => {
		if (err) return callback (err, null);
		const sql = 'insert into writing set ?';
		const params = {username: username, title : title, contents : contents};

				conn.query(sql, params, (err, results) => {
					if(err) {
						conn.release();
						return callback(err, null);
					}
					//console.log('writing success')
					return callback(null, {msg : 'writing success'});
					conn.release();
				});
	});
}

Writing.getWriList = function(query, callback) {
	pool.getConnection ((err, conn) => {
		if(err) return callback(err, null);
		//console.log(query);

		const sql = 'select write_id, username, title from write order by write_id desc;'
		conn.query(sql, (err, result) => {

			const obj = {
				count : result[1].length,
				data : result[1]
			}
			callback(null, obj);
			conn.release();
			});
		});
	});

//To delete a text
Writing.eraseWrite = (writeId, userId, callback) => {
	pool.getConnection( (err, conn) => {
		const sql = 'delete from write where writeId = ? and userId = ? ';
		conn.query(sql, [writeId, userId], (err, result) => {
			if(err) {
				conn.release();
				return callback(err, null);
			}
			conn.release();
		})
	})
}

Writing.updateWrite = (writeId, title, contents, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
		var data = {title : title, contents : contents};
		var sql = 'update write set ? where writeId = ?';

		conn.query(sql,[data, writeId], (err, result) => {
			if(err) {
				conn.release();
				return callback(err,null);
			}
			callback(null, {msg: 'update success'})
			conn.release();
		});
	});
}

Writing.getWriteDetail = (writeId, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
		conn.query('select * from write where writeId = ?',writeId, (err,results) => {
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
