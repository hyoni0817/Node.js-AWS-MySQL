## 사용법
1. model/dbConnection.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 writingQuery.sql 파일을  실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
    ```
    node app.js
    ```
4. app.js를 실행하고 난 뒤, 아래 설명을 참고해주세요.

## API 명세
- 사용자들이 작성한 게시글 목록 보기
    |메서드|요청 URL|출력 포맷
    |:---:|:---:|:---:|
    |GET|http://localhost:4000/board|JSON|
    
- 게시글 추가
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/board|x-www-form-urlendcoded|userId(String) : 사용자 ID<br/>username(String) : 사용자 닉네임<br/>title(String) : 제목<br/>contents(String) : 내용|

- 게시글 삭제
    |메서드|요청 URL|Content-type|Body|
    |:---:|:---:|:---:|:---|
    |POST|http://localhost:4000/board/delete|x-www-form-urlendcoded|writeId(Integer) : 글 번호<br/>userId(String) : 사용자 ID|

- 게시글 보기
    |메서드|요청 URL|파라미터(타입)|출력 포맷
    |:---:|:---:|:---|:---:|
    |GET|http://localhost:4000/board/:writeId|writeId(Integer)) : 글 번호|JSON|

    사용 예시 
    - writeId가 1인 글 보기<br/>http://localhost:4000/board/1

- 게시글 편집하기
    |메서드|요청 URL|파라미터(타입)|Content-type|Body|
    |:---:|:---:|:---|:---:|:---|
    |POST|http://localhost:4000/board/:writeId|writeId(Integer)) : 글 번호|x-www-form-urlendcoded|title(String) : 제목<br/>contents(String) : 내용<br/>userId(String): 사용자 ID<br/>|
    
    사용 예시 
    - writeId가 1인 글 편집하기<br/>http://localhost:4000/board/1 <br/>
    그리고 request body 파라미터로 title, contents, userId를 전달한다.