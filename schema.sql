DROP DATABASE IF EXISTS loginDb;

CREATE DATABASE loginDb;

USE loginDb;

CREATE TABLE users (
  id SERIAL,
  userName varchar(50),
  userEmail varchar(50) UNIQUE,
  userPassword varchar(70)
)