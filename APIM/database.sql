create schema grama_request; 
use grama_request;

CREATE TABLE `divisions` (
  `division_id` int NOT NULL AUTO_INCREMENT,
  `division` varchar(255) NOT NULL,
  PRIMARY KEY (`division_id`)
);

CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT ,
  `address` varchar(150) NOT NULL,
  `division_id` int NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`division_id`)
);

CREATE TABLE `citizens` (
  `NIC` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address_id` int NOT NULL,
  PRIMARY KEY (`NIC`),
  KEY `address_id` (`address_id`),
);


CREATE TABLE `certificate_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `division_id` int DEFAULT NULL,
  `NIC` varchar(20) NOT NULL,
  `Id_check` tinyint(1) DEFAULT NULL,
  `address_check` tinyint(1) DEFAULT NULL,
  `police_check` tinyint(1) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `division_id` (`division_id`),
  KEY `NIC` (`NIC`),
  CONSTRAINT `certificate_requests_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`division_id`),

);


CREATE TABLE `crimes` (
  `crime_id` int NOT NULL AUTO_INCREMENT,
  `Id` varchar(255) DEFAULT NULL,
  `crime_description` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`crime_id`),
);

INSERT INTO divisions(division) values ('Division A'),('Division B'),('Division C'),('Division D'),('Division E');

INSERT INTO Address (address, division_id) VALUES ('Main Street,Apt 4', 1),('456 Oak Avenue, Unit B', 2),('789 Pine Road,Suite 7', 3);

INSERT INTO citizens(NIC,first_name,last_name,address_id) VALUES ('20006756432','Miyura','Perera',1),('19879956432','Nimesh','Silva',1);

INSERT INTO `certificate_requests` VALUES (1,1,'20006756432',1,0,1,1),(2,1,'19879956432',1,1,0,2);

INSERT INTO `crimes` VALUES (1001,'20006756432','Theft','2023-01-01'),(1002,'20006756432','Assault','2023-02-15'),(1003,'19879956432','Vandalism','2023-03-10'),(1004,'19879956432','Burglary','2023-04-22'),(1005,'19879956432','Fraud','2023-05-05');


