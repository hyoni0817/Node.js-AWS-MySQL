create table oilprice (
	OIL_ID int(1) auto_increment not null,
    GASOLINE double not null,
    primary key(OIL_ID)
);

insert into oilprice values(1,1322.1);
select * from oilprice;