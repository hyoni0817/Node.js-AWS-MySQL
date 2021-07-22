## 사용법
1. model/dbConnection.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 MsgQuery.sql 파일을  실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. router/fcmPush.js 에서 아래 코드 부분에 안드로이드 쪽에서 생성된 서버키를 입력해주세요.
    ```javascript
    var serverKey = 'your serverKey'; //안드로이드 쪽에서 생성한 서버키
    ```
4. 마지막으로 app.js를 실행시켜줍니다.
    ```
    node app.js
    ```
5. app.js를 실행하고 난 뒤, 아래 설명을 참고해주세요.

## API 명세
- 받은/보낸 메시지함
    |메서드|요청 URL|파라미터(타입)|출력 포맷
    |:---:|:---:|:---|:---:|
    |GET|http://localhost:4000/:userId/message?box={box값}|userId(String) : 사용자 ID<br/>box(String): 메시지함<br/>**box의 구분값**<br/>- received:받은 메시지함<br/>- sent: 보낸 메시지함|JSON|
    
    사용 예시 
    - userId가 Hwang25인 사용자의 보낸 메시지함<br/>http://localhost:4000/Hwang25/message?box=sent
    - userId가 Hwang25인 사용자의 받은 메시지함<br/>http://localhost:4000/Hwang25/message?box=received
- 메시지 전송
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/message|x-www-form-urlendcoded|sender(String) : 보내는 사람 ID<br/>msgText(String) : 메시지 내용<br/>receiver(String): 받는 사람 ID<br/>|
    
- 메시지 삭제
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/message/delete|x-www-form-urlendcoded|userId(String) : 사용자 ID<br/>messageNo(Integer): 메시지함<br/>box(String) : 받은/보낸 메세지함<br/>**box의 구분값**<br/>- received:받은 메시지함<br/>- sent: 보낸 메시지함<br/>|
    