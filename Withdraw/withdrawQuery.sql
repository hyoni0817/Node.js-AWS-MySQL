create table withdraw (
	NUM int(10) auto_increment,
    USER_ID int(10) not null,
    NICKNAME varchar(10) not null,
    PRO_IMG varchar(100) not null,
    LEAVE_DT date not null,
    primary key(NUM)
);

create table users (
	USER_ID varchar(10) not null,
    NICKNAME varchar(10) not null,
    PHONE_NO int(11) not null,
    PRO_IMG varchar(100) not null,
    GENDER varchar(1) not null,
    JOIN_DT date not null,
    primary key(USER_ID)
);

insert into users (USER_ID, NICKNAME, PHONE_NO, PRO_IMG, GENDER, JOINDATE, USERNAME) values ('king89', 'HappyDay', 01012345678, '0', 'M', '2017-07-01', 'Smith');
