create table review (
	WRI_NO int(10) auto_increment not null,
    RECEIVE_ID varchar(10) not null,
    SEND_ID varchar(10) not null,
    stars double not null,
    REVIEW_TEXT varchar(400) not null,
    REVIEW_DT datetime not null,
    primary key(WRI_NO)
);

#users table 생성 쿼리는 withdraw 폴더의 withdrawQuery.sql 파일에 있습니다.
