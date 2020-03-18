-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `CID` char(18) NOT NULL,
  `CNAME` char(18) DEFAULT NULL,
  `CCARD` char(18) DEFAULT NULL,
  `CTYPE` decimal(10,2) DEFAULT NULL,
  `CCOUNT` decimal(4,0) DEFAULT '0',
  `GID` char(18) NOT NULL,
  `CTIME` datetime NOT NULL,
  `CMONEY` decimal(10,2) NOT NULL,
  PRIMARY KEY (`CID`),
  KEY `Index_Name` (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES ('1234501','da_a','0',21.00,1,'11','2020-02-21 00:00:00',12.00),('1234502','da_b','1',22.00,1,'12','2020-02-22 00:00:00',18.00),('1234503','da_c','0',23.00,0,'13','2020-02-23 00:00:00',9.00),('1234504','da_d','0',24.00,1,'14','2020-02-24 00:00:00',23.00),('1234505','da_e','1',25.00,1,'15','2020-02-25 00:00:00',19.00);
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GOODS`
--

DROP TABLE IF EXISTS `GOODS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GOODS` (
  `GID` char(18) NOT NULL,
  `DNAME` varchar(15) NOT NULL,
  `GPRICE` decimal(8,2) NOT NULL,
  `GTYPE` decimal(10,0) DEFAULT NULL,
  `GCOUNT` int(11) DEFAULT '0',
  PRIMARY KEY (`GID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GOODS`
--

LOCK TABLES `GOODS` WRITE;
/*!40000 ALTER TABLE `GOODS` DISABLE KEYS */;
INSERT INTO `GOODS` VALUES ('11','huangsheng',12.00,21,100),('12','zhima',18.00,22,100),('13','lvdou',9.00,23,101),('14','shiliu',23.00,24,100),('15','yaoguo',19.00,25,100);
/*!40000 ALTER TABLE `GOODS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gathering`
--

DROP TABLE IF EXISTS `Gathering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Gathering` (
  `RID` char(18) NOT NULL,
  `RTIME` datetime NOT NULL,
  `GID` char(18) NOT NULL,
  `RMONEY` decimal(10,2) NOT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gathering`
--

LOCK TABLES `Gathering` WRITE;
/*!40000 ALTER TABLE `Gathering` DISABLE KEYS */;
INSERT INTO `Gathering` VALUES ('1234501','2020-02-01 00:00:00','11',1200.00),('1234502','2020-02-02 00:00:00','12',1800.00),('1234503','2020-02-03 00:00:00','13',900.00),('1234504','2020-02-04 00:00:00','14',2300.00),('1234505','2020-02-05 00:00:00','15',1900.00);
/*!40000 ALTER TABLE `Gathering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IOForms`
--

DROP TABLE IF EXISTS `IOForms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IOForms` (
  `IOID` char(18) NOT NULL,
  `GID` char(18) NOT NULL,
  `CID` char(18) NOT NULL,
  `IOTIME` datetime NOT NULL,
  `IOTYPE` decimal(10,2) NOT NULL,
  `IOCOUNT` decimal(4,0) DEFAULT NULL,
  `IOMONEY` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`IOID`,`GID`),
  KEY `RefGOODS13` (`GID`),
  CONSTRAINT `RefGOODS13` FOREIGN KEY (`GID`) REFERENCES `GOODS` (`GID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IOForms`
--

LOCK TABLES `IOForms` WRITE;
/*!40000 ALTER TABLE `IOForms` DISABLE KEYS */;
INSERT INTO `IOForms` VALUES ('5432100','11','1111101','2020-02-01 00:00:00',21.00,100,1200.00),('5432101','12','1111102','2020-02-02 00:00:00',22.00,100,1800.00),('5432102','13','1111103','2020-02-03 00:00:00',23.00,100,900.00),('5432103','14','1111104','2020-02-04 00:00:00',24.00,100,2300.00),('5432104','15','1111105','2020-02-05 00:00:00',25.00,100,1900.00),('5432105','11','1234501','2020-02-21 00:00:00',21.00,1,11.00),('5432106','12','1234502','2020-02-22 00:00:00',22.00,1,12.00),('5432107','13','1234503','2020-02-23 00:00:00',23.00,1,13.00),('5432108','14','1234504','2020-02-24 00:00:00',24.00,1,14.00),('5432109','15','1234505','2020-02-25 00:00:00',25.00,1,15.00),('5432110','11','86760110','2020-02-27 00:00:00',21.00,-1,12.00),('5432111','12','86770110','2020-02-27 00:00:00',22.00,-1,18.00),('5432112','13','86780110','2020-02-28 00:00:00',23.00,-1,9.00),('5432113','13','1234503','2020-02-22 00:00:00',22.00,-1,-9.00);
/*!40000 ALTER TABLE `IOForms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Refund`
--

DROP TABLE IF EXISTS `Refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Refund` (
  `REFID` char(10) NOT NULL,
  `REFTIME` datetime NOT NULL,
  `GID` char(18) NOT NULL,
  `REFMONEY` decimal(10,2) NOT NULL,
  PRIMARY KEY (`REFID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Refund`
--

LOCK TABLES `Refund` WRITE;
/*!40000 ALTER TABLE `Refund` DISABLE KEYS */;
INSERT INTO `Refund` VALUES ('86760110','2020-02-27 00:00:00','11',12.00),('86770110','2020-02-27 00:00:00','12',18.00),('86780110','2020-02-28 00:00:00','13',9.00);
/*!40000 ALTER TABLE `Refund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `SID_SupplierBigger3`
--

DROP TABLE IF EXISTS `SID_SupplierBigger3`;
/*!50001 DROP VIEW IF EXISTS `SID_SupplierBigger3`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `SID_SupplierBigger3` AS SELECT 
 1 AS `SID`,
 1 AS `SLOC`,
 1 AS `SNAME`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Supplier`
--

DROP TABLE IF EXISTS `Supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Supplier` (
  `SID` char(6) NOT NULL,
  `GID` char(18) NOT NULL,
  `SLOC` varchar(15) DEFAULT NULL,
  `SNAME` varchar(15) NOT NULL,
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supplier`
--

LOCK TABLES `Supplier` WRITE;
/*!40000 ALTER TABLE `Supplier` DISABLE KEYS */;
INSERT INTO `Supplier` VALUES ('1','11','GZ','A'),('2','12','XJ','B'),('3','13','XH','C'),('4','14','TM','D'),('5','15','YL','E');
/*!40000 ALTER TABLE `Supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SupplierGOODS`
--

DROP TABLE IF EXISTS `SupplierGOODS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SupplierGOODS` (
  `SID` char(6) NOT NULL,
  `GID` char(18) NOT NULL,
  PRIMARY KEY (`SID`,`GID`),
  KEY `RefGOODS5` (`GID`),
  CONSTRAINT `RefGOODS5` FOREIGN KEY (`GID`) REFERENCES `GOODS` (`GID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SupplierGOODS`
--

LOCK TABLES `SupplierGOODS` WRITE;
/*!40000 ALTER TABLE `SupplierGOODS` DISABLE KEYS */;
/*!40000 ALTER TABLE `SupplierGOODS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seq`
--

DROP TABLE IF EXISTS `seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seq` (
  `name` varchar(50) NOT NULL,
  `start_value` int(11) NOT NULL,
  `increment_value` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seq`
--

LOCK TABLES `seq` WRITE;
/*!40000 ALTER TABLE `seq` DISABLE KEYS */;
INSERT INTO `seq` VALUES ('seq_no',5432114,1);
/*!40000 ALTER TABLE `seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `SID_SupplierBigger3`
--

/*!50001 DROP VIEW IF EXISTS `SID_SupplierBigger3`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `SID_SupplierBigger3` AS select `Supplier`.`SID` AS `SID`,`Supplier`.`SLOC` AS `SLOC`,`Supplier`.`SNAME` AS `SNAME` from `Supplier` where (`Supplier`.`SID` > 3) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-12 21:01:19