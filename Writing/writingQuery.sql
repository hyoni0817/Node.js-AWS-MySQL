create table board(
	WRITE_ID int(10) auto_increment,
    USER_ID varchar(10) not null,
	USERNAME varchar(10) not null,
    TITLE varchar(45) not null,
    CONTETNTS MEDIUMTEXT not null,
    primary key(WRITE_ID)
);
    
    