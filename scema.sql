DROP DATABASE IF EXISTS myCompany_DB;
CREATE DATABASE myCompany_DB;

USE myCompany_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title VARCHAR (30) NOT NULL,
department VARCHAR(20) NOT NULL,
salary INTEGER(7),
manager VARCHAR(20) ,
primary key (id)
);