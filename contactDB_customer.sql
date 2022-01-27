create table customer
(
    email      varchar(100) null,
    firstname  varchar(100) null,
    lastname   varchar(100) null,
    username   varchar(100) null,
    birthday   varchar(100) null,
    registered date         null
);

INSERT INTO contactDB.customer (email, firstname, lastname, username, birthday, registered) VALUES ('max.mustermann@muster.ch', 'Max', 'Mustermann', 'max.mustermann', '1999-01-01', '2022-01-27');
