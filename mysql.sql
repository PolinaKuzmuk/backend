-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table sport_list: ~0 rows (approximately)
DELETE FROM `sport_list`;
INSERT INTO `sport_list` (`id`, `sport_name`) VALUES
	(1, 'soccer'),
	(2, 'basketball'),
	(3, 'formula 1'),
	(4, 'handball');


-- Dumping data for table match_list: ~20 rows (approximately)
DELETE FROM `match_list`;
INSERT INTO `match_list` (`id`, `sport_id`, `match_name`, `match_start_date`, `scores`) VALUES
	(1, 1, 'Real Madrid - Bayern', '2024-05-08', '2-1'),
	(2, 1, 'PSG - Dortmund', '2024-05-07', '0-1'),
	(3, 1, 'Bayern - Real Madrid', '2024-04-30', '2-2'),
	(4, 1, 'Bayern - Arsenal', '2024-04-17', '1-0'),
	(5, 1, 'Man City - Real Madrid', '2024-04-17', '1-1'),
	(6, 2, 'Indiana Pacers - New York Knicks', '2024-05-14', '91-121'),
	(7, 2, 'Minnesota Timberwolves - Denver Nuggets', '2024-05-14', '97-112'),
	(8, 2, 'Philadelphia 76ers - New York Knicks', '2024-04-30', '112-106'),
	(9, 2, 'Orlando Magic - Cleveland Cavaliers', '2024-04-30', '103-104'),
	(10, 2, 'BBoston Celtics - Miami Heat', '2024-04-29', '102-88'),
	(11, 3, 'Grand Prix Bahrain', '2024-03-02', 'Verstappen 57 laps'),
	(12, 3, 'Grand Prix Saudi Arabia', '2024-03-09', 'Verstappen 50 laps'),
	(13, 3, 'Grand Prix Australia', '2024-03-24', 'Sainz 58 laps'),
	(14, 3, 'Japan', '2024-04-07', 'Verstappen 53 laps'),
	(15, 3, 'China', '2024-04-21', 'Verstappen 56 laps'),
	(16, 4, 'Vipers Kristiansand - Gjerpen HK Skien', '2024-04-23', '31-19'),
	(17, 4, 'Sola - Fredrikstad Ballklubb', '2024-04-24', '30-24'),
	(18, 4, 'Freidrikstad Ballklubb - Sola', '2024-04-27', '21-37'),
	(19, 4, 'Oppsal - Storhamar Handball Elite', '2024-04-28', '27-39'),
	(20, 4, 'Molde Elite - Larvik', '2024-04-29', '32-27');



/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
