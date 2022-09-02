-- CREATE DATABASE managebook;
USE managebook;

CREATE TABLE `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `id` varchar(30) NOT NULL,
    `password` varchar(70) NOT NULL,
    `nickname` varchar(30) NOT NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `books` (
    `book_id` int(11) NOT NULL AUTO_INCREMENT,
    `bookname` varchar(50) NOT NULL,
    `start` date NOT NULL,
    `end` date,
    `theme` varchar(10) NOT NULL,
    `review` varchar(2048) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (`book_id`)
);