var FCM = require('fcm-push');
const pool = require('./dbConnection.js');

var serverKey = 'AIzaSyBFVSRNkNoIgI_atpqc1SuXy3vWyl7-23g'; //안드로이드 쪽 사람이 생성한 서버키
var fcm = new FCM(serverKey);

class Fcmpush {}

//메시지를 전송 했을 떄 푸시 메시지(콜백 함수 필요함)
Fcmpush.sendMsgPush = function(receiver, sender, callback){
    var message;
        pool.getConnection( (err, conn) => {
            if(err) return callback(err, null);
         conn.query('select TOKEN from users where USER_ID = ?;select NICKNAME from users where USER_ID = ?',[receiver, sender], (err, results) =>{
                if(err) {
                    console.error('Error : ', err);
                    callback(err, null);
                    conn.release();
                    return;
                }
                message = {
                    to: results[0][0].TOKEN, // required
                    collapse_key: 'your_collapse_key',
                    data: {
                        message: results[1][0].NICKNAME+'님의 메시지가 도착하였습니다.',
                        state: 0
                    }
                };
                fcm.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!", err);
                    } else {
                        console.log("Successfully sent with response: ", response);
                        callback(null, {msg: message.body})
                    }
                });
                conn.release();
            })
        })
      }

module.exports = Fcmpush;
