CREATE DATABASE mysqlnode;

USE mysqlnode;

CREATE TABLE Paciente(
    id_pac INT not null AUTO_INCREMENT,
    nombre varchar(30) not null,
    appat varchar(30) not null,
    apmat varchar(30) not null,
    tel varchar(12) null,
    enf_pac varchar(60) null,
    PRIMARY KEY(id_pac));
