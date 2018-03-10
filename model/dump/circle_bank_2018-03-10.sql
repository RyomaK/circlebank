# ************************************************************
# Sequel Pro SQL dump
# バージョン 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# ホスト: 127.0.0.1 (MySQL 5.7.19)
# データベース: circle_bank
# 作成時刻: 2018-03-10 02:13:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# テーブルのダンプ circle_sns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circle_sns`;

CREATE TABLE `circle_sns` (
  `circle_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`circle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `circle_sns` WRITE;
/*!40000 ALTER TABLE `circle_sns` DISABLE KEYS */;

INSERT INTO `circle_sns` (`circle_id`, `name`)
VALUES
	(1,'http://line@');

/*!40000 ALTER TABLE `circle_sns` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `url_name` varchar(11) NOT NULL DEFAULT '',
  `number` int(11) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'img/circles/default.png',
  `bill_image` varchar(255) NOT NULL DEFAULT 'img/circle/bill/default.png',
  `introduction` text NOT NULL,
  `campus` varchar(255) NOT NULL DEFAULT '',
  `entrance_fee` varchar(255) NOT NULL DEFAULT '',
  `annual_fee` varchar(255) NOT NULL DEFAULT '0',
  `activity_of_week` varchar(255) NOT NULL DEFAULT '',
  `activity_time` varchar(255) NOT NULL DEFAULT '',
  `admission_deadline` varchar(255) NOT NULL DEFAULT '',
  `box_number` varchar(255) NOT NULL DEFAULT '',
  `booth_number` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `url_name` (`url_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `name`, `url_name`, `number`, `image`, `bill_image`, `introduction`, `campus`, `entrance_fee`, `annual_fee`, `activity_of_week`, `activity_time`, `admission_deadline`, `box_number`, `booth_number`)
VALUES
	(1,'hands up','handsup',30,'img/circles/1.png','img/circle/bill/default.png','アットホームなバスケットボールサークルです','京田辺','4000','5000','水曜','13時から','なし','1','1'),
	(2,'fly speck','flyspeck',100,'img/circles/2.png','img/circle/bill/default.png','テニス','京田辺/今出川','4000','3000','金曜,月曜','金曜は12時','なし','2','2'),
	(3,'Nexus','nexus',100,'img/circles/3.png','img/circle/bill/default.png','軽音','京田辺/今出川','4000','12000','木曜','日による','nasi','3','3'),
	(4,'平成企画合戦ピテクス','pitex',50,'img/circles/4.png','img/circle/bill/default.png','企画サークル','京田辺/今出川','4000','2000','金曜','色々','の','4','4'),
	(5,'軽音サークル','music',100,'img/circles/5.png','img/circle/bill/default.png','軽音','今出川','4000','500000','木曜','色々','no-','5','5');

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


# テーブルのダンプ cirlce_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cirlce_images`;

CREATE TABLE `cirlce_images` (
  `ciecle_id` int(11) unsigned NOT NULL,
  `image_url` int(11) DEFAULT NULL,
  PRIMARY KEY (`ciecle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ delegates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `delegates`;

CREATE TABLE `delegates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `contact` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `delegates` WRITE;
/*!40000 ALTER TABLE `delegates` DISABLE KEYS */;

INSERT INTO `delegates` (`id`, `circle_id`, `name`, `contact`)
VALUES
	(1,1,'田中','tanaka@mail.com'),
	(2,2,'大野','arashi@mail.com'),
	(3,3,'谷','sample@sample'),
	(4,4,'重松','sample@sample'),
	(5,5,'田中','sample@sample');

/*!40000 ALTER TABLE `delegates` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'img/users/default.png',
  `agenda` date NOT NULL,
  `place` varchar(255) DEFAULT '',
  `detail` varchar(255) DEFAULT '',
  `capacity` int(11) DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

INSERT INTO `events` (`id`, `circle_id`, `name`, `image`, `agenda`, `place`, `detail`, `capacity`, `fee`)
VALUES
	(1,2,'ほわ音でー','img/users/default.png','2017-02-14','a','f',10,10),
	(2,1,'ホワイトデー','img/users/default.png','2017-02-15','fsad','fds',0,0),
	(3,2,'fsa','img/users/default.png','2017-02-14','fsa','fdsa',1,1),
	(4,1,'水族館デー','img/users/default.png','2018-04-06','京都水族館','京田辺駅集合です',100,1000),
	(5,2,'宅ぱ','img/users/default.png','2018-04-04','会長の家','鍋をやります',100,0),
	(6,3,'お花見','img/users/default.png','2018-03-04','円山公園','みんなで桜見ながらご飯食べましょう',1000,100),
	(7,4,'お絵かき','img/users/default.png','2018-04-05','ローム3F','一番面白い絵かけた人の勝ちです',100,0),
	(8,5,'新歓ライブ','img/users/default.png','2018-04-29','寒梅館','9:00からライブします。無料です',100,1000),
	(9,4,'新歓合宿','img/users/default.png','2018-05-04','天橋立','合宿いきます',50,12000),
	(10,3,'新歓ライブ','img/users/default.png','2018-04-05','京都246','入場無料です。ぜひきてください',10000,500);

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
	(9,'女の子可愛い','その他'),
	(10,'イケメン','その他');

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
	(3,'櫻井','sakurai@gmail.com','$2a$10$Stqc3LpJYS7.yzvF3mFIku6ZO/9Apr7KN8BvtSOLqgI6sTfxdD4UC'),
	(4,'相田','aida@gmail.com','$2a$10$XMGMyBAaoRYHWdrzY7HfKu3Wcla6S9w3BThdYKd8NehrgYnU81aRO'),
	(5,'admin','admin@user1234','$2a$10$Rj43eRZVwv4ISdNxCuIi0O3PC3NBNnaUNzXAk1UHnDJ5fgImoUdWO'),
	(6,'津國健太','tamkchi.fugu@gmail.com','$2a$10$DoukLJ3RsNIua1iw2dHLLuUKXz67LOMvkJsyjYTQQssH2HHUvRTCi'),
	(7,'しょ','keyaki.1204@docomo.ne.jp','$2a$10$Wfq.k8YlJphRhmGpSy8z0.IPaHWVwCkHijyR7nCS7BGlB/omlYsJ.'),
	(8,'櫻井啓裕','kei.wata.taekwondo@gmail.com','$2a$10$qqyAYPvtKMQNzyaWZ2XqIubv7vRKN0p3uobC7WHHzMQbveG/QU58a'),
	(9,'村田裕希','2018orite@gmail.com','$2a$10$mSToa6asvkzIrJ.5drZD.uUffY7ki7U/9SKho2eOTohaJLMMVMviK'),
	(10,'<script>alert(1);</script>','a@a','$2a$10$kSzL1Ir9st00s34u7jMwBujdwtc2oqfULRc.rTvXkHkNWjhgrn2ee'),
	(11,'Kskmdk','Sample@sample','$2a$10$sOcYZYurRcwI3e.NYL/U1eqmfDhhWCBuwPcJgXK/HtXJLpN15vW.K'),
	(12,'` or 1=1 --','a@aaa','$2a$10$X5vAiVG6nzbobQhQFeBSFOs0CUkWHVuFkPu/fNFiXUXHNhgTkGgGu'),
	(13,'asdfa','afadsf@asdfa','$2a$10$cMyKUHNnGpCLaLozKXDJXuwcb5ZHD9UHUoVLX7AL.8IMtkDp9ZNo6');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
