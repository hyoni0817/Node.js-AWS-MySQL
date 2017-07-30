//이 파일만으로 node 실행이 가능합니다.(This file can run without app.js.)

var request = require('request');
const pool = require('./dbConnection.js');
var schedule = require('node-schedule');

//node-schedule로 매주 토요일 새벽 한시에 가격 업데이트(Update prices at 1:00 a.m. every Saturday with node-schedule)
//Test를 하려면 자신이 원하는 시간대로 맞춘 뒤 실행시켜주세요.
//If you want to test it, adjust it to the desired time zone and run it.
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [6];
rule.hour = 1;
rule.minute = 00;

var oil = schedule.scheduleJob(rule, function(){
  var options = {
    url: 'http://www.opinet.co.kr/api/avgLastWeek.do?prodcd=B027&code='+'Opinet에서 API키를 받아서 입력해주세요.'+'&out=json&sido=17',
    headers: {
      'User-Agent': 'request'
    }
  };

  gasoline = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var gasePrice = info.RESULT.OIL[0].PRICE;
      //console.log(info.RESULT.OIL[0].PRICE);

      pool.getConnection( (err, conn) => {
        conn.query('update oilprice set GASOLINE = ? where OIL_ID = 1',gasePrice, (err) => {
          if(err) {
            console.error('Error : ', err);
            conn.release();
            return;
          }
          console.log('Update successful!');
          conn.release();
        })
      })
    }
  }
  request(options, gasoline);
  console.log('...');
});
