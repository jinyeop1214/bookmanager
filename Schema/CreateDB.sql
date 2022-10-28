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
    `start` timestamp NOT NULL,
    `end` timestamp,
    `theme` varchar(10) NOT NULL,
    `review` varchar(2048) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (`book_id`)
);

-- INSERT INTO books(bookname, start, end, theme, review, user_id) VALUES('bookname', '2020-01-01', '2020-01-02', '페칭', '무한 스크롤 구현 ...', 1);