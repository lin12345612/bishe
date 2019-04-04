/*
SQLyog Ultimate - MySQL GUI v8.2 
MySQL - 5.5.27 : Database - day05
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`day05` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `day05`;

/*Table structure for table `grade` */

DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
  `sid` varchar(10) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  KEY `fk_stu_sco` (`sid`),
  CONSTRAINT `fk_stu_sco` FOREIGN KEY (`sid`) REFERENCES `stu` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `grade` */

insert  into `grade`(`sid`,`score`,`cid`) values ('1001',96,1),('1002',94,1),('1002',91,2),('1003',98,2),('1003',90,3),('1004',99,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
