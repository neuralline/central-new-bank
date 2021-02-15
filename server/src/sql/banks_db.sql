CREATE DATABASE /*!32312 IF NOT EXISTS*/ bank /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE bank;

DROP TABLE IF EXISTS bank_accounts;
CREATE TABLE `bank_accounts` (
  `account_id` varchar(36) NOT NULL,
  `balance` double NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(12) NOT NULL DEFAULT '',
  `sort_code` varchar(8) NOT NULL DEFAULT '',
  `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `IDX_65acc35cc4ac39547e9a2f25a9` (`number`),
  KEY `FK_29146c4a8026c77c712e01d922b` (`user_id`),
  CONSTRAINT `FK_29146c4a8026c77c712e01d922b` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS payment_requests;
CREATE TABLE `payment_requests` (
  `payment_id` varchar(36) NOT NULL,
  `amount` double NOT NULL,
  `amount_paid` double NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `account_id` varchar(36) DEFAULT NULL,
  `senderUserId` varchar(36) DEFAULT NULL,
  `receiverUserId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK_d0fa4000b41045ed0eec61afb04` (`account_id`),
  KEY `FK_e48b403933d759cf848a3715eee` (`senderUserId`),
  KEY `FK_37a13de33f592630901935edc25` (`receiverUserId`),
  CONSTRAINT `FK_37a13de33f592630901935edc25` FOREIGN KEY (`receiverUserId`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_d0fa4000b41045ed0eec61afb04` FOREIGN KEY (`account_id`) REFERENCES `bank_accounts` (`account_id`),
  CONSTRAINT `FK_e48b403933d759cf848a3715eee` FOREIGN KEY (`senderUserId`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




INSERT INTO bank_accounts(account_id,balance,name,number,sort_code,created_on,updated_at,user_id) VALUES('00b23700-3d6b-4f21-a25a-6145e0733e13',49948,'Black card','12345678033','12235462','2021-02-15 01:56:55.528406','2021-02-15 02:19:29.000000','801765f0-69b6-4f76-9baa-498e59f94511'),('72162d45-c0b2-4a83-bae5-f6ed1c0bac55',200,'poor card','97945678033','12235462','2021-02-15 02:01:05.587192','2021-02-15 02:01:05.587192','94d00434-2440-43fc-81a4-e1e9815df166'),('9aadd50c-52bf-49a8-94ce-86bc78abb813',50000,'investment card','17345678033','12235462','2021-02-15 01:57:31.682404','2021-02-15 01:57:31.682404','801765f0-69b6-4f76-9baa-498e59f94511'),('d4922a47-86c9-41a4-9407-bd29d9b73b3d',50000,'not so robin card','99945678033','12235462','2021-02-15 02:00:49.977261','2021-02-15 02:00:49.977261','94d00434-2440-43fc-81a4-e1e9815df166');

INSERT INTO payment_requests(payment_id,amount,amount_paid,active,created_on,updated_at,account_id,senderUserId,receiverUserId) VALUES('1d6c603a-f278-43cb-9aa0-4e7ed6aaeadb',470,52,1,'2021-02-15 02:10:31.020974','2021-02-15 02:19:29.000000','72162d45-c0b2-4a83-bae5-f6ed1c0bac55','801765f0-69b6-4f76-9baa-498e59f94511','94d00434-2440-43fc-81a4-e1e9815df166'),('3de7b98f-88d2-4d15-a762-334572e62c83',220,0,1,'2021-02-15 02:19:59.417610','2021-02-15 02:19:59.417610','00b23700-3d6b-4f21-a25a-6145e0733e13','94d00434-2440-43fc-81a4-e1e9815df166','801765f0-69b6-4f76-9baa-498e59f94511');
INSERT INTO users(user_id,name,email,created_on,updated_at) VALUES('801765f0-69b6-4f76-9baa-498e59f94511','Mr Banker','mrbanker@banker.com','2021-02-15 01:56:10.158438','2021-02-15 02:02:14.924109'),('94d00434-2440-43fc-81a4-e1e9815df166','Robin Hood','robinhood@banker.com','2021-02-15 01:55:46.099954','2021-02-15 01:55:46.099954');







