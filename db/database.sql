-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: usedoc_db
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cestado`
--

DROP TABLE IF EXISTS `cestado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cestado` (
  `id_sta` int(11) NOT NULL AUTO_INCREMENT,
  `name_sta` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_sta`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cestado`
--

LOCK TABLES `cestado` WRITE;
/*!40000 ALTER TABLE `cestado` DISABLE KEYS */;
INSERT INTO `cestado` VALUES (1,'Aguascalientes'),(2,'Baja California'),(3,'Baja California Sur'),(4,'Campeche'),(5,'Chihuahua'),(6,'Chiapas'),(7,'Coahuila'),(8,'Ciudad de Mexico'),(9,'Colima'),(10,'Durango'),(11,'Guanajuato'),(12,'Guerrero'),(13,'Hidalgo'),(14,'Jalisco'),(15,'México'),(16,'Michoacán'),(17,'Morelos'),(18,'Nayarit'),(19,'Nuevo León'),(20,'Oaxaca'),(21,'Puebla'),(22,'Querétaro'),(23,'Quintana Roo, '),(24,'San Luis Potosí,   '),(25,'Sinaloa,  '),(26,'Sonora, '),(27,'Tabasco, '),(28,'Tamaulipas'),(29,'Tlaxcala'),(30,'Veracruz'),(31,'Yucatán'),(32,'Zacatecas');
/*!40000 ALTER TABLE `cestado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contacto` (
  `id_con` int(11) NOT NULL AUTO_INCREMENT,
  `rut_con` varchar(350) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_med` int(11) NOT NULL,
  PRIMARY KEY (`id_con`),
  KEY `id_pac` (`id_pac`),
  KEY `id_med` (`id_med`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crangos`
--

DROP TABLE IF EXISTS `crangos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `crangos` (
  `id_ran` int(11) NOT NULL AUTO_INCREMENT,
  `des_ran` varchar(45) NOT NULL,
  PRIMARY KEY (`id_ran`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crangos`
--

LOCK TABLES `crangos` WRITE;
/*!40000 ALTER TABLE `crangos` DISABLE KEYS */;
INSERT INTO `crangos` VALUES (1,'Principal'),(2,'Auxiliar');
/*!40000 ALTER TABLE `crangos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `csexo`
--

DROP TABLE IF EXISTS `csexo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `csexo` (
  `id_sex` int(11) NOT NULL AUTO_INCREMENT,
  `nom_sex` varchar(15) NOT NULL,
  PRIMARY KEY (`id_sex`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `csexo`
--

LOCK TABLES `csexo` WRITE;
/*!40000 ALTER TABLE `csexo` DISABLE KEYS */;
INSERT INTO `csexo` VALUES (1,'Masculino'),(2,'Femenino'),(3,'Otro');
/*!40000 ALTER TABLE `csexo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctipos`
--

DROP TABLE IF EXISTS `ctipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ctipos` (
  `id_tip` int(11) NOT NULL AUTO_INCREMENT,
  `des_tip` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tip`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctipos`
--

LOCK TABLES `ctipos` WRITE;
/*!40000 ALTER TABLE `ctipos` DISABLE KEYS */;
INSERT INTO `ctipos` VALUES (1,'Finalizada'),(2,'Pendiente'),(3,'Cancelada');
/*!40000 ALTER TABLE `ctipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctipousuario`
--

DROP TABLE IF EXISTS `ctipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ctipousuario` (
  `id_tid` int(11) NOT NULL AUTO_INCREMENT,
  `des_tid` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctipousuario`
--

LOCK TABLES `ctipousuario` WRITE;
/*!40000 ALTER TABLE `ctipousuario` DISABLE KEYS */;
INSERT INTO `ctipousuario` VALUES (1,'Medico'),(2,'Paciente');
/*!40000 ALTER TABLE `ctipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostico`
--

DROP TABLE IF EXISTS `diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `diagnostico` (
  `id_dig` int(11) NOT NULL AUTO_INCREMENT,
  `id_enf` int(11) NOT NULL,
  `des_dig` varchar(500) NOT NULL,
  PRIMARY KEY (`id_dig`),
  KEY `id_enf` (`id_enf`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mcitas`
--

DROP TABLE IF EXISTS `mcitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mcitas` (
  `id_cit` int(11) NOT NULL AUTO_INCREMENT,
  `id_pac` int(11) NOT NULL,
  `id_med` int(11) NOT NULL,
  `des_cit` varchar(500) DEFAULT 'Sin descripcion',
  `dat_cit` varchar(500) NOT NULL,
  `hor_cit` varchar(45) NOT NULL DEFAULT '14:00',
  `id_tip` int(11) NOT NULL,
  `mc_cit` varchar(500) DEFAULT 'No cancelada',
  PRIMARY KEY (`id_cit`),
  KEY `id_pac` (`id_pac`),
  KEY `id_med` (`id_med`),
  KEY `id_tip_idx` (`id_tip`),
  CONSTRAINT `id_tip` FOREIGN KEY (`id_tip`) REFERENCES `ctipos` (`id_tip`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcitas`
--

LOCK TABLES `mcitas` WRITE;
/*!40000 ALTER TABLE `mcitas` DISABLE KEYS */;
INSERT INTO `mcitas` VALUES (5,10,7,'Sin descripcion','2b43b90fa804a80708','2856b20eb5',2,'No cancelada'),(6,10,7,'Sin descripcion','2b43b90fa804a80708','295db20eb5',2,'No cancelada'),(7,10,7,'Sin descripcion','2143b90fa804a80708','295eb20eb5',2,'No cancelada'),(12,10,7,'Sin descripcion','295aa50fb41baa06000e','2859b20db5',2,'No cancelada'),(13,10,7,'Sin descripcion','295ca50fb41baa06000e','2859b20db5',2,'No cancelada');
/*!40000 ALTER TABLE `mcitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdatos`
--

DROP TABLE IF EXISTS `mdatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mdatos` (
  `id_dat` int(11) NOT NULL AUTO_INCREMENT,
  `id_usr` int(11) NOT NULL,
  `id_sex` int(11) NOT NULL,
  `tel_dat` varchar(100) NOT NULL,
  `numext_dat` varchar(100) NOT NULL,
  `numint_dat` varchar(100) DEFAULT NULL,
  `calle_dat` varchar(180) NOT NULL,
  `del_dat` varchar(100) NOT NULL,
  `id_sta` int(11) NOT NULL,
  `col_dat` varchar(180) NOT NULL,
  `codpost_dat` varchar(100) NOT NULL,
  PRIMARY KEY (`id_dat`),
  KEY `id_usr` (`id_usr`),
  KEY `id_sex` (`id_sex`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdatos`
--

LOCK TABLES `mdatos` WRITE;
/*!40000 ALTER TABLE `mdatos` DISABLE KEYS */;
INSERT INTO `mdatos` VALUES (4,12,1,'2d5bbe0fb001a00e0206','2d','20','20','560ffd5de45ae8575f',15,'750fe65ded57b85f58','2d5dbf0fb1'),(5,13,1,'2d5bbe0fb001a00e0206','2d','20','20','560ffd5de45ae8575f',15,'750fe65ded57b85f58','2d5dbf0fb2');
/*!40000 ALTER TABLE `mdatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mdoctores`
--

DROP TABLE IF EXISTS `mdoctores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mdoctores` (
  `id_med` int(11) NOT NULL AUTO_INCREMENT,
  `name_med` varchar(50) NOT NULL,
  `appat_med` varchar(50) NOT NULL,
  `apmat_med` varchar(50) NOT NULL,
  `ced_med` varchar(50) NOT NULL,
  `id_usr` int(11) NOT NULL,
  PRIMARY KEY (`id_med`),
  KEY `id_usr` (`id_usr`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mdoctores`
--

LOCK TABLES `mdoctores` WRITE;
/*!40000 ALTER TABLE `mdoctores` DISABLE KEYS */;
INSERT INTO `mdoctores` VALUES (7,'5d0afd5ff752f7','5902ea57eb59','5f0ffa5dec57','295cbb0ab000af0e',12);
/*!40000 ALTER TABLE `mdoctores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mhistoriales`
--

DROP TABLE IF EXISTS `mhistoriales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mhistoriales` (
  `id_his` int(11) NOT NULL AUTO_INCREMENT,
  `rut_his` varchar(400) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `fec_his` date NOT NULL,
  PRIMARY KEY (`id_his`),
  KEY `id_pac` (`id_pac`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mhistoriales`
--

LOCK TABLES `mhistoriales` WRITE;
/*!40000 ALTER TABLE `mhistoriales` DISABLE KEYS */;
/*!40000 ALTER TABLE `mhistoriales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mhorario_medico`
--

DROP TABLE IF EXISTS `mhorario_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mhorario_medico` (
  `id_hor` int(11) NOT NULL AUTO_INCREMENT,
  `id_med` int(11) NOT NULL,
  `hi_hor` varchar(45) NOT NULL,
  `hf_hor` varchar(45) NOT NULL,
  `tiem_hor` varchar(45) NOT NULL,
  `di_hor` varchar(45) NOT NULL,
  PRIMARY KEY (`id_hor`),
  KEY `id_med` (`id_med`),
  CONSTRAINT `mhorario_medico_ibfk_1` FOREIGN KEY (`id_med`) REFERENCES `mdoctores` (`id_med`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mhorario_medico`
--

LOCK TABLES `mhorario_medico` WRITE;
/*!40000 ALTER TABLE `mhorario_medico` DISABLE KEYS */;
INSERT INTO `mhorario_medico` VALUES (1,7,'2859b20eb5','295bb20eb5','285eb20db5','295cbb0ab000af');
/*!40000 ALTER TABLE `mhorario_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mpaciente_medico`
--

DROP TABLE IF EXISTS `mpaciente_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mpaciente_medico` (
  `id_pm` int(11) NOT NULL AUTO_INCREMENT,
  `id_med` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_ran` int(11) NOT NULL,
  PRIMARY KEY (`id_pm`),
  KEY `id_med_idx` (`id_med`),
  KEY `id_pac_idx` (`id_pac`),
  KEY `id_ran_idx` (`id_ran`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mpaciente_medico`
--

LOCK TABLES `mpaciente_medico` WRITE;
/*!40000 ALTER TABLE `mpaciente_medico` DISABLE KEYS */;
INSERT INTO `mpaciente_medico` VALUES (4,7,10,1);
/*!40000 ALTER TABLE `mpaciente_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mpacientes`
--

DROP TABLE IF EXISTS `mpacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mpacientes` (
  `id_pac` int(11) NOT NULL AUTO_INCREMENT,
  `nom_pac` varchar(50) NOT NULL,
  `appat_pac` varchar(50) NOT NULL,
  `apmat_pac` varchar(50) NOT NULL,
  `id_usr` int(11) NOT NULL,
  `sta_pac` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_pac`),
  KEY `id_usr` (`id_usr`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mpacientes`
--

LOCK TABLES `mpacientes` WRITE;
/*!40000 ALTER TABLE `mpacientes` DISABLE KEYS */;
INSERT INTO `mpacientes` VALUES (10,'5d0afd5ff752f7','5902ea57eb59','5f0ffa5dec57',13,1);
/*!40000 ALTER TABLE `mpacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mpadecimiento`
--

DROP TABLE IF EXISTS `mpadecimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mpadecimiento` (
  `id_enf` int(11) NOT NULL AUTO_INCREMENT,
  `des_enf` varchar(350) NOT NULL,
  PRIMARY KEY (`id_enf`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mpadecimiento`
--

LOCK TABLES `mpadecimiento` WRITE;
/*!40000 ALTER TABLE `mpadecimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `mpadecimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mseguimiento`
--

DROP TABLE IF EXISTS `mseguimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mseguimiento` (
  `id_seg` int(11) NOT NULL AUTO_INCREMENT,
  `id_pac` int(11) NOT NULL,
  `id_med` int(11) NOT NULL,
  `fec_seg` date NOT NULL,
  `id_dig` int(11) NOT NULL,
  `id_tra` int(11) NOT NULL,
  `note_seg` varchar(170) DEFAULT NULL,
  PRIMARY KEY (`id_seg`),
  KEY `id_pac` (`id_pac`),
  KEY `id_med` (`id_med`),
  KEY `id_dig` (`id_dig`),
  KEY `id_tra` (`id_tra`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mseguimiento`
--

LOCK TABLES `mseguimiento` WRITE;
/*!40000 ALTER TABLE `mseguimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `mseguimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musuarios`
--

DROP TABLE IF EXISTS `musuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `musuarios` (
  `id_usr` int(11) NOT NULL AUTO_INCREMENT,
  `email_usr` varchar(120) NOT NULL,
  `pass_usr` varchar(100) NOT NULL,
  `reg_usr` varchar(200) NOT NULL,
  `id_tid` int(11) NOT NULL,
  PRIMARY KEY (`id_usr`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musuarios`
--

LOCK TABLES `musuarios` WRITE;
/*!40000 ALTER TABLE `musuarios` DISABLE KEYS */;
INSERT INTO `musuarios` VALUES (12,'7d0afd5fe207ae07715097487102680231fb','791dec0fb705d96575','2c41b111b706a90f',1),(13,'680feb57e058ec53715097487102680231fb','791dec0fb705d96555','2c41b111b706a90f',2);
/*!40000 ALTER TABLE `musuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamientos`
--

DROP TABLE IF EXISTS `tratamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tratamientos` (
  `id_tra` int(11) NOT NULL AUTO_INCREMENT,
  `des_tra` varchar(1000) NOT NULL,
  `hor_tra` datetime NOT NULL,
  `rut_tra` varchar(400) NOT NULL,
  PRIMARY KEY (`id_tra`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamientos`
--

LOCK TABLES `tratamientos` WRITE;
/*!40000 ALTER TABLE `tratamientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamientos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-02 17:57:06
