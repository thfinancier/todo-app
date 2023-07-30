CREATE DATABASE todo_database;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);