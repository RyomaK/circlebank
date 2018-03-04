# ************************************************************
# Sequel Pro SQL dump
# バージョン 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# ホスト: 127.0.0.1 (MySQL 5.7.19)
# データベース: circle_bank
# 作成時刻: 2018-03-02 16:49:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# テーブルのダンプ circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `univ_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `url_name` varchar(11) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT 'img/circles/default.png',
  `number` int(11) NOT NULL,
  `gender_ratio` varchar(30) DEFAULT NULL,
  `introduction` text NOT NULL,
  `excite` int(11) NOT NULL,
  `fee` int(11) unsigned NOT NULL DEFAULT '0',
  `campus` varchar(255) DEFAULT NULL,
  `message_for_fresh` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `univ_id`, `name`, `url_name`, `image`, `number`, `gender_ratio`, `introduction`, `excite`, `fee`, `campus`, `message_for_fresh`)
VALUES
	(1,1,'hands up','handsup','img/circles/1.png',30,'1:1','アットホームなバスケットボールサークルです',3,5000,'京田辺','いつでもきてね'),
	(2,1,'fly speck','flyspeck','img/circles/2.png',100,'1:1','テニス',9,3000,'京田辺/今出川','いつでもきてねえええ'),
	(3,1,'Nexus','nexus','img/circles/3.png',100,'1:1','軽音',2,12000,'京田辺/今出川','軽音サークルNexusです。\n気軽に見に来てください。'),
	(4,1,'平成企画合戦ピテクス','pitex','img/circles/4.png',50,'1:1','企画サークル',1,2000,'京田辺/今出川','へんなことたくさんしてます。'),
	(5,1,'軽音サークル','music','img/circles/5.png',100,'10:0','軽音',1,500000,'今出川','まじめに軽音してます。');

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ circles_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles_tags`;

CREATE TABLE `circles_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `circles_tags` WRITE;
/*!40000 ALTER TABLE `circles_tags` DISABLE KEYS */;

INSERT INTO `circles_tags` (`id`, `circle_id`, `tag_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,2,3),
	(4,1,3),
	(5,2,4),
	(6,5,7),
	(7,4,5),
	(8,2,6);

/*!40000 ALTER TABLE `circles_tags` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ delegetes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `delegetes`;

CREATE TABLE `delegetes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `contact` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `delegetes` WRITE;
/*!40000 ALTER TABLE `delegetes` DISABLE KEYS */;

INSERT INTO `delegetes` (`id`, `circle_id`, `name`, `contact`)
VALUES
	(1,1,'田中','tanaka@mail.com'),
	(2,2,'大野','arashi@mail.com'),
	(3,3,'谷','sample@sample'),
	(4,4,'重松','sample@sample'),
	(5,5,'田中','sample@sample');

/*!40000 ALTER TABLE `delegetes` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'img/users/default.png',
  `agenda` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `place` varchar(255) NOT NULL DEFAULT '',
  `detail` varchar(255) NOT NULL DEFAULT '',
  `capacity` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

INSERT INTO `events` (`id`, `circle_id`, `name`, `image`, `agenda`, `place`, `detail`, `capacity`, `fee`)
VALUES
	(1,2,'ほわ音でー','img/users/default.png','2017-02-14 15:41:30','a','f',10,10),
	(2,1,'ホワイトデー','img/users/default.png','2017-02-15 00:00:00','fsad','fds',0,0),
	(3,2,'fsa','img/users/default.png','2017-02-14 00:00:00','fsa','fdsa',1,1),
	(4,1,'水族館デー','img/users/default.png','2018-04-06 00:00:00','京都水族館','京田辺駅集合です',100,1000),
	(5,2,'宅ぱ','img/users/default.png','2018-04-04 00:00:00','会長の家','鍋をやります',100,0),
	(6,3,'お花見','img/users/default.png','2018-03-04 00:00:00','円山公園','みんなで桜見ながらご飯食べましょう',1000,100),
	(7,4,'お絵かき','img/users/default.png','2018-04-05 00:00:00','ローム3F','一番面白い絵かけた人の勝ちです',100,0),
	(8,5,'新歓ライブ','img/users/default.png','2018-04-29 00:00:00','寒梅館','9:00からライブします。無料です',100,1000),
	(9,4,'新歓合宿','img/users/default.png','2018-05-04 00:00:00','天橋立','合宿いきます',50,12000),
	(10,3,'新歓ライブ','img/users/default.png','2018-04-05 00:00:00','京都246','入場無料です。ぜひきてください',10000,500);

/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `class_name` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`id`, `name`, `class_name`)
VALUES
	(1,'バスケットボール','運動'),
	(2,'アットホーム','その他'),
	(3,'京田辺','その他'),
	(4,'今出川','その他'),
	(5,'飲みサークル','その他'),
	(6,'テニス','運動'),
	(7,'軽音','文化'),
	(8,'野球','運動'),
	(9,'女の子可愛い','その他');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `mail` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `mail`, `password`)
VALUES
	(1,'栗栖','ryooomaaa0413@gmail.com','$2a$10$3rCT9hO/RZu1Qxd.lhJA7.6EDUZ5SPTVcVlu4KKQZNPYin.rKNJ0S'),
	(2,'津國健太','tsukuni@gmail.com','$2a$10$g0Xsy1kZ3eoAOxNRdXe.xOTHpw1SKMtRlOSsMgamhWqA6DYPevu3a'),
	(3,'櫻井啓裕','kei.wata.taekwondo@gmail.com','$2a$10$qqyAYPvtKMQNzyaWZ2XqIubv7vRKN0p3uobC7WHHzMQbveG/QU58a'),
	(4,'村田裕希','2018orite@gmail.com','$2a$10$mSToa6asvkzIrJ.5drZD.uUffY7ki7U/9SKho2eOTohaJLMMVMviK'),
	
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
