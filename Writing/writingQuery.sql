create table board(
	WRITE_ID int(10) auto_increment,
	USERNAME varchar(10) not null,
    TITLE varchar(45) not null,
    CONTETNTS MEDIUMTEXT not null,
    primary key(WRITE_ID)
    );
    
    