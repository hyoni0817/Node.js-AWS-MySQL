## 사용법
1. model/dbConnection.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 reviewQuery.sql 파일을  실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
    ```
    node app.js
    ```
4. app.js를 실행하고 난 뒤, 아래 설명을 참고해주세요.

## API 명세
- 받은/보낸 리뷰함
    |메서드|요청 URL|파라미터(타입)|출력 포맷
    |:---:|:---:|:---|:---:|
    |GET|http://localhost:4000/user/:userId/review/:box|userId(String) : 사용자 ID<br/>box(String): 메시지함<br/>**box의 구분값**<br/>- received:받은 메시지함<br/>- sent: 보낸 메시지함|JSON|
    
    사용 예시 
    - userId가 Hwang25인 사용자의 보낸 리뷰함<br/>http://localhost:4000//user/Hwang25/review/sent
    - userId가 Hwang25인 사용자의 받은 리뷰함<br/>http://localhost:4000//user/Hwang25/review/received
- 리뷰 전송
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/user/review|x-www-form-urlendcoded|sendUser(String) : 보내는 사람 ID<br/>reviewText(String) : 메시지 내용<br/>stars(Double): 별점<br/>receiveUser(String): 받는 사람 ID<br/>|
    
    