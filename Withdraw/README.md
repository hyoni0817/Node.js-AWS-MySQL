## 사용법
1. model/dbConnection.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 withdrawQuery.sql 파일을  실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
    ```
    node app.js
    ```
4. app.js를 실행하고 난 뒤, 아래 설명을 참고해주세요.

## API 명세
- 회원 탈퇴
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/leaveId|x-www-form-urlendcoded|userId(String) : 사용자 ID|
    
    