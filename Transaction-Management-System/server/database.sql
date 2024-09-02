CREATE DATABASE IF NOT EXISTS `transaction_database`;

USE `transaction_database`;

DROP TABLE IF EXISTS `users`; 
CREATE TABLE `users`(
    `email` VARCHAR(50) NOT NULL PRIMARY KEY,
    `password` VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`(
    `id` BIGINT NOT NULL AUTO_INCREMENT primary key,
    `transaction_id` VARCHAR(50) NOT NULL,
    `customer_id` VARCHAR(50) NOT NULL,
    `transaction_date` DATE not null default (CURRENT_DATE),
    `amount` BIGINT NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `payment_method` VARCHAR(20) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`customer_id`) REFERENCES users(email)
);


CREATE TABLE `admin`(
    `email` VARCHAR(50) NOT NULL PRIMARY KEY,
    `password` VARCHAR(100) NOT NULL
);

INSERT INTO `admin` VALUES ('admin@gmail.com', '$2b$10$cJpLb9Aoq1M85lXTZsIMTe0B6bdXq9pdef2lW7cN792.D0RclONoa');