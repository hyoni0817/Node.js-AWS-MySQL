<h1 align="center">🛣카풀 서비스 API 모음</h1>
<p align="center">카풀 앱을 운영하면서 개발 했던 API 중 일부 코드만 정리해서 업로드했습니다.</p>
<div align="center">
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"></img>
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"></img>
    <img src="https://img.shields.io/badge/AWS(EC2, RDS)-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"></img>
</div>

## 각 폴더에서 구현된 기능 소개
- [FCM_And_Message](https://github.com/hyoni0817/Node.js-AWS-MySQL/tree/master/FCM_And_Message) : 사용자 간에 메시지를 주고받고, 메시지 도착 시 Firebase Cloud Messaging을 통해 안드로이드 어플에 알림을 전달하는 기능
- [JSON-Parsing](https://github.com/hyoni0817/Node.js-AWS-MySQL/tree/master/JSON-Parsing) : 오피넷에서 제공하는 유가정보 API의 JSON 데이터를 파싱해서 매주 일요일 유가를 업데이트하는 기능
- [Review](https://github.com/hyoni0817/Node.js-AWS-MySQL/tree/master/Review) : 카풀 이용 후 상대방에게 리뷰를 전송하고, 받은/보낸 리뷰함에 저장하는 기능
- [Withdraw](https://github.com/hyoni0817/Node.js-AWS-MySQL/tree/master/Withdraw) : 회원 탈퇴 기능
- [Writing](https://github.com/hyoni0817/Node.js-AWS-MySQL/tree/master/Writing) : 드라이버 및 라이더 찾는 글 작성/수정/삭제 기능

## 설치 방법
1. 이 repository를 clone 해준 뒤, Node.js-AWS-MySQL 폴더로 이동해서 npm 모듈을 설치해줍니다. 
   ```
   git clone https://github.com/hyoni0817/Node.js-AWS-MySQL.git
   cd Node.js-AWS-MySQL && npm init
   ```
2. 각 폴더마다 따로 실행되게 되어있습니다.   
   실행해보고 싶은 폴더의 README를 참고하여 사용해주세요.