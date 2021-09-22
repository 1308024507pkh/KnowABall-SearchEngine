create database dqd;
use dqd;
create table news(
	id int not null primary key,
    url varchar(256),
    title varchar(256),
    author varchar(256),
    content text,
    tags varchar(256)
);

create table teamBaseInfo(
	id int not null primary key,
    url varchar(256),
    birthYear int,
    country varchar(32),
    city varchar(32),
    stadium varchar(64),
    audience int,
    phone varchar(32),
    email varchar(64),
    name varchar(64),
    englishName varchar(64),
    address varchar(64)
);

create table TeamRelatedPerson(
	id int not null primary key auto_increment,
    teamId int,
    role varchar(8),
    number int,
    name varchar(64)
);

create table TeamHonorRecord(
	id int not null primary key auto_increment,
    teamId int,
    honor varchar(64),
    years varchar(1024)
);

create table PlayerBaseInfo(
	id int not null primary key,
    teamId int,
    url varchar(128),
    club varchar(64),
    country varchar(64),
    role varchar(8),
    height int,
    weight int,
    age int,
    number int,
    birthday date,
    preferedFoot bool,
    name varchar(64),
    englishName varchar(64),
    capablity int,
    speed int,
    strength int,
    defence int,
    dribbling int,
    pass int,
    shoot int
);

create table playerTransferData(
	id int not null auto_increment primary key,
    playerId int,
    transferMonth varchar(32),
    inClub varchar(64),
    outClub varchar(64)
);

create table playerMatchData(
	id int not null auto_increment primary key,
    playerId int,
    season varchar(16),
    club varchar(64),
    play int,
    start int,
    goal int,
    assist int,
    yellowCard int,
    redCard int,
    subsititute int
);

create table playerInjuredData(
	id int not null auto_increment primary key,
    playerId int,
    club varchar(64),
    injury varchar(32),
    period varchar(32)
);