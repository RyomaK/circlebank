# ************************************************************
# Sequel Pro SQL dump
# バージョン 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# ホスト: 127.0.0.1 (MySQL 5.7.19)
# データベース: circle_bank
# 作成時刻: 2018-02-18 13:11:32 +0000
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


# テーブルのダンプ comments
# ------------------------------------------------------------

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` (`id`, `user_id`, `circle_id`, `point`, `text`)
VALUES
	(2,2,2,10,'本当良い'),
	(5,6,4,1,'Hbbhh'),
	(9,1,1,1,'dsf\n');

/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ delegetes
# ------------------------------------------------------------

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


# テーブルのダンプ events_schedules
# ------------------------------------------------------------

LOCK TABLES `events_schedules` WRITE;
/*!40000 ALTER TABLE `events_schedules` DISABLE KEYS */;

INSERT INTO `events_schedules` (`id`, `user_id`, `event_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,1,3),
	(4,3,2),
	(6,2,3);

/*!40000 ALTER TABLE `events_schedules` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ likes
# ------------------------------------------------------------

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;

INSERT INTO `likes` (`id`, `user_id`, `circle_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,1,2),
	(5,4,1),
	(6,6,1),
	(8,6,3);

/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ tags
# ------------------------------------------------------------

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
	(7,'軽音','文化');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ universities
# ------------------------------------------------------------

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;

INSERT INTO `universities` (`id`, `url_name`, `name`)
VALUES
	(1,'doshisha','同志社大学'),
	(2,'kanseigakuin','関西学院大学'),
	(3,'doshisha','同志社女子大学');

/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `univ_id`, `name`, `gender`, `mail`, `password`, `image`, `year`, `department`, `subject`)
VALUES
	(1,1,'栗栖','男','ryooomaaa0413@gmail.com','$2a$10$3rCT9hO/RZu1Qxd.lhJA7.6EDUZ5SPTVcVlu4KKQZNPYin.rKNJ0S','img/users/1.png',2015,'理工学部','情報システムデザイン学科'),
	(2,1,'津國健太','男','tsukuni@gmail.com','$2a$10$g0Xsy1kZ3eoAOxNRdXe.xOTHpw1SKMtRlOSsMgamhWqA6DYPevu3a','img/users/2.png',2015,'理工学部','機械システム学科'),
	(3,1,'櫻井','男','sakurai@gmail.com','$2a$10$Stqc3LpJYS7.yzvF3mFIku6ZO/9Apr7KN8BvtSOLqgI6sTfxdD4UC','img/users/default.png',2015,'理工学部','情報システムデザイン学科'),
	(4,1,'相田','男','aida@gmail.com','$2a$10$XMGMyBAaoRYHWdrzY7HfKu3Wcla6S9w3BThdYKd8NehrgYnU81aRO','img/users/default.png',2015,'理工学部','情報システムデザイン学科'),
	(5,1,'admin','男','admin@user1234','$2a$10$Rj43eRZVwv4ISdNxCuIi0O3PC3NBNnaUNzXAk1UHnDJ5fgImoUdWO','img/users/default.png',2015,'理工学部','情報システムデザイン学科'),
	(6,1,'津國健太','男','tamkchi.fugu@gmail.com','$2a$10$DoukLJ3RsNIua1iw2dHLLuUKXz67LOMvkJsyjYTQQssH2HHUvRTCi','img/users/default.png',2018,'理工学部','情報システムデザイン学科'),
	(7,1,'しょ','男','keyaki.1204@docomo.ne.jp','$2a$10$Wfq.k8YlJphRhmGpSy8z0.IPaHWVwCkHijyR7nCS7BGlB/omlYsJ.','img/users/default.png',2018,'神学部','神学科'),
	(8,1,'櫻井啓裕','男','kei.wata.taekwondo@gmail.com','$2a$10$qqyAYPvtKMQNzyaWZ2XqIubv7vRKN0p3uobC7WHHzMQbveG/QU58a','img/users/default.png',2016,'理工学部','情報システムデザイン学科'),
	(9,1,'村田裕希','男','2018orite@gmail.com','$2a$10$mSToa6asvkzIrJ.5drZD.uUffY7ki7U/9SKho2eOTohaJLMMVMviK','img/users/default.png',2018,'法学部','社会学科'),
	(10,1,'<script>alert(1);</script>','男','a@a','$2a$10$kSzL1Ir9st00s34u7jMwBujdwtc2oqfULRc.rTvXkHkNWjhgrn2ee','img/users/default.png',2018,'神学部','神学科'),
	(11,1,'Kskmdk','男','Sample@sample','$2a$10$sOcYZYurRcwI3e.NYL/U1eqmfDhhWCBuwPcJgXK/HtXJLpN15vW.K','img/users/default.png',2018,'神学部','神学科'),
	(12,1,'` or 1=1 --','男','a@aaa','$2a$10$X5vAiVG6nzbobQhQFeBSFOs0CUkWHVuFkPu/fNFiXUXHNhgTkGgGu','img/users/default.png',2018,'神学部','神学科'),
	(13,1,'asdfa','男','afadsf@asdfa','$2a$10$cMyKUHNnGpCLaLozKXDJXuwcb5ZHD9UHUoVLX7AL.8IMtkDp9ZNo6','img/users/default.png',2018,'神学部','神学科');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
