create table playerNewsTitles(
	playerId int not null auto_increment primary key,
    name varchar(64),
    english_name varchar(64),
    titles text
);