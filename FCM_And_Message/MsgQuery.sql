create table message (
	MSG_NO int(10) auto_increment,
    RECEIVE_ID varchar(10) not null,
    SEND_ID varchar(10) not null,
    MSG_TEXT varchar(100) not null,
    MSG_DATE DATE not null,
    READ_ST int(1) not null,
    primary key(MSG_NO)
);

create table users (
	USER_ID varchar(10) not null,
    NICKNAME varchar(10) not null,
    PHONE_NO varchar(11) not null,
    PRO_IMG varchar(100) not null,
    GENDER varchar(1) not null,
    JOIN_DT date not null,
    USER_NM varchar(15) not null,
    TOKEN varchar(100) not null,
    primary key(USER_ID)
);

#TOKEN 값은 따로 입력해주세요.
insert into users (USER_ID, NICKNAME, PHONE_NO, PRO_IMG, GENDER, JOIN_DT, USER_NM, TOKEN) values ('king89', 'HappyDay', '01012345678', '0', 'M', '2017-07-01', 'Smith','token value');
insert into users (USER_ID, NICKNAME, PHONE_NO, PRO_IMG, GENDER, JOIN_DT, USER_NM, TOKEN) values ('lucky89', 'Beautiful', '01098765432', '0', 'F', '2017-07-03', 'Ariana', 'token value');

ALTER TABLE `test`.`message` 
ADD INDEX `USERS_FK1_idx` (`RECEIVE_ID` ASC),
ADD INDEX `USERS_FK2_idx` (`SEND_ID` ASC);
ALTER TABLE `test`.`message` 
ADD CONSTRAINT `USERS_FK1`
  FOREIGN KEY (`RECEIVE_ID`)
  REFERENCES `test`.`users` (`USER_ID`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `USERS_FK2`
  FOREIGN KEY (`SEND_ID`)
  REFERENCES `test`.`users` (`USER_ID`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
			