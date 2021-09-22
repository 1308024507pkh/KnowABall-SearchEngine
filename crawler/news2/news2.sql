create table news2(
	id int not null primary key auto_increment,
    article_id int,
    url varchar(256),
    title varchar(256),
    author varchar(256),
    time datetime,
    content text,
    tags varchar(256),
    img_url varchar(256)
);