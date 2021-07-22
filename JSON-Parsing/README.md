## 사용법
1. model/dbConnection.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 OilQuery.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요.
3. Opinet에서 발급받은 API키를 입력해주세요. 유가 정보 API키 발급 관련해서는 [여기](https://www.opinet.co.kr/user/custapi/custApiInfo.do)를 참고해주세요.
    ```javascript
    var oil = schedule.scheduleJob(rule, function(){
    var options = {
        url: 'http://www.opinet.co.kr/api/avgLastWeek.do?prodcd=B027&code='+'Opinet에서 API키를 받아서 입력해주세요.'+'&out=json&sido=17',
        headers: {
        'User-Agent': 'request'
        }
    };
    ```
3. 마지막으로 parsing.js를 실행시켜줍니다.
    ```
    node parsing.js
    ```
4. app.js를 실행하고 난 뒤, 아래 설명을 참고해주세요.

## API 설명
- 본 API는 node-schedule을 사용하고 있습니다. 매주 토요일 새벽 한시를 기준으로 유가를 업데이트하여 DB에 반영합니다. <br/>요일 및 시간 설정을 다시 하시려면 [여기](https://www.npmjs.com/package/node-schedule)의 Usage를 참고하여 아래 코드를 수정해주세요. 
    ```javascript
    rule.dayOfWeek = [6];
    rule.hour = 1;
    rule.minute = 00;
    ```
    
    