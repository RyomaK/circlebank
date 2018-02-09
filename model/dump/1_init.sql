
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



# テーブルのダンプ circles_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles_tags`;

CREATE TABLE `circles_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `circle_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `circle_id` int(11) DEFAULT NULL,
  `point` int(11) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



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



# テーブルのダンプ events_schedules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events_schedules`;

CREATE TABLE `events_schedules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `circle_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ universities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `universities`;

CREATE TABLE `universities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `univ_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `gender` char(2) NOT NULL DEFAULT '',
  `mail` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'img/users/default.png',
  `year` int(11) NOT NULL,
  `department` varchar(255) NOT NULL DEFAULT '',
  `subject` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
