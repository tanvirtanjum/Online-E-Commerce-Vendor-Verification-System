-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2022 at 11:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oevvs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `access`
--

CREATE TABLE `access` (
  `id` int(11) NOT NULL,
  `access_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `access`
--

INSERT INTO `access` (`id`, `access_name`) VALUES
(3, 'ACTIVE'),
(2, 'BLOCKED'),
(1, 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL,
  `credential` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `emergency_contact` varchar(255) NOT NULL,
  `verification_count` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `verification_status_id` int(11) NOT NULL,
  `verification_officer_id` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `credential`, `name`, `address`, `emergency_contact`, `verification_count`, `owner_id`, `type_id`, `verification_status_id`, `verification_officer_id`, `updated_at`) VALUES
(1, 'B1654156283374', 'DUMMY', 'DUMMY', '+8801515217821', 2, 1, 4, 3, 1, '2022-06-03 15:07:15'),
(2, 'B1654156290010', 'DUMMY', 'DUMMY', '1515217821', 0, 1, 1, 1, NULL, '2022-06-02 13:51:30'),
(3, 'B1654156318148', 'DUMMY', 'DUMMY', '1515217821', 1, 1, 1, 4, 1, '2022-06-03 14:56:48'),
(4, 'B1654156318800', 'DUMMY', 'DUMMY', '1515217821', 0, 1, 1, 2, 1, '2022-06-03 13:41:28'),
(5, 'B1654156318988', 'DUMMY', 'DUMMY', '1515217821', 0, 1, 1, 1, NULL, '2022-06-02 13:51:59'),
(6, 'B1654156376701', 'DUMMY', 'DUMMY', '1515217821', 0, 1, 1, 1, NULL, '2022-06-02 13:52:56'),
(7, 'B1654156453691', 'Dummy', 'Dummy', '1515217821', 0, 1, 1, 1, NULL, '2022-06-02 13:54:13'),
(8, 'B1654156460598', 'Dummy', 'Dummy', '1515217821', 0, 1, 1, 1, NULL, '2022-06-02 13:54:20');

-- --------------------------------------------------------

--
-- Table structure for table `business_types`
--

CREATE TABLE `business_types` (
  `id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `business_types`
--

INSERT INTO `business_types` (`id`, `type_name`) VALUES
(5, ' Fast Food Shop'),
(3, 'Baby and Mother’s Product'),
(6, 'Cosmetic Shop'),
(1, 'Fashion House'),
(7, 'Mobile Sales Repair'),
(8, 'Other'),
(4, 'Stationary Shop'),
(2, 'Toy Shop');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `consumer_id` int(11) NOT NULL,
  `eso_id` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `consumers`
--

CREATE TABLE `consumers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nid_no` varchar(255) DEFAULT NULL,
  `passport_no` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `bg` varchar(255) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `login_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `consumers`
--

INSERT INTO `consumers` (`id`, `name`, `nid_no`, `passport_no`, `gender`, `dob`, `bg`, `contact_no`, `login_id`, `updated_at`) VALUES
(1, 'Ayesha Rahman', 'sadasd', NULL, 'Female', '2022-05-23', 'AB+', '+8801515217822', 6, '2022-06-02 15:21:09'),
(3, 'Shazin Purab', NULL, 'wqdqwd', 'Male', '2022-05-25', 'O+', '+8801820019823', 9, '2022-06-01 00:38:27'),
(6, 'Ayesha Orpa ', 'sadasd353ferferg', NULL, 'Male', '2022-06-20', 'A+', '+8801565234564', 12, '2022-06-02 15:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `business_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `path`, `business_id`, `updated_at`) VALUES
(2, 'uploads\\verification_uploads\\1654195398813-680912010-KFT Changes.txt', 1, '2022-06-03 00:43:18'),
(3, 'uploads\\verification_uploads\\1654238575531-398691614-Minimum Passing Grade (Online Copy).pdf', 1, '2022-06-03 12:42:55');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_support_officers`
--

CREATE TABLE `emergency_support_officers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nid_no` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `bg` varchar(255) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `login_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emergency_support_officers`
--

INSERT INTO `emergency_support_officers` (`id`, `name`, `nid_no`, `gender`, `dob`, `bg`, `contact_no`, `login_id`, `updated_at`) VALUES
(2, 'Tanvir Tanjum', '324424435', 'Male', '2022-05-23', 'O+', '+8801515217821', 1, '2022-05-27 23:56:53');

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img_path` varchar(255) DEFAULT 'uploads\\avatar\\profile_avatar.png',
  `role_id` int(11) NOT NULL,
  `access_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `email`, `password`, `img_path`, `role_id`, `access_id`, `created_at`, `updated_at`) VALUES
(1, 'tanjumtanvir@gmail.com', '123456', 'uploads\\avatar\\1654163452939-282756852-DDI-276631  PP.jpg', 1, 3, '2022-05-19 16:35:33', '2022-06-02 15:50:52'),
(6, 'ayesha35-2514@diu.edu.bd', '123456', 'uploads\\avatar\\1654163526575-447541902-Ayesha.jpg', 3, 3, '2022-05-27 20:36:50', '2022-06-02 15:52:06'),
(9, 'ayesharahmanorpa@diu.edu.bd', '1592392', 'uploads\\avatar\\profile_avatar.png', 3, 3, '2022-05-31 21:05:38', '2022-06-02 00:33:26'),
(10, 'zishadhossainlimon@gmail.com', '123456', 'uploads\\avatar\\profile_avatar.png', 2, 3, '2022-06-01 23:24:24', '2022-06-01 23:44:31'),
(12, 'ayesha35-25144rr@diu.edu.bd', '1820904', 'uploads\\avatar\\profile_avatar.png', 3, 3, '2022-06-02 15:23:15', '2022-06-02 15:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `polices`
--

CREATE TABLE `polices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nid_no` varchar(255) NOT NULL,
  `employee_no` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `bg` varchar(255) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `login_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `polices`
--

INSERT INTO `polices` (`id`, `name`, `nid_no`, `employee_no`, `gender`, `dob`, `bg`, `contact_no`, `login_id`, `updated_at`) VALUES
(1, 'Zishad Limon', 'dfgdfhgthyyth', 'P1654104264448', 'Male', '2022-06-16', 'A+', '+8801521203725', 10, '2022-06-01 23:44:24');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(3, 'Consumer'),
(2, 'Police'),
(1, 'Support');

-- --------------------------------------------------------

--
-- Table structure for table `verification_status`
--

CREATE TABLE `verification_status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verification_status`
--

INSERT INTO `verification_status` (`id`, `status_name`) VALUES
(2, 'Assigned-In Evaluation'),
(1, 'Pending'),
(4, 'Rejected'),
(3, 'Verified');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `access_name` (`access_name`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `credential` (`credential`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `verification_status_id` (`verification_status_id`),
  ADD KEY `verification_officer_id` (`verification_officer_id`);

--
-- Indexes for table `business_types`
--
ALTER TABLE `business_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_name` (`type_name`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consumer_id` (`consumer_id`),
  ADD KEY `eso_id` (`eso_id`);

--
-- Indexes for table `consumers`
--
ALTER TABLE `consumers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contact_no` (`contact_no`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD UNIQUE KEY `passport_no` (`passport_no`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `emergency_support_officers`
--
ALTER TABLE `emergency_support_officers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD UNIQUE KEY `contact_no` (`contact_no`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `access_id` (`access_id`);

--
-- Indexes for table `polices`
--
ALTER TABLE `polices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD UNIQUE KEY `employee_no` (`employee_no`),
  ADD UNIQUE KEY `contact_no` (`contact_no`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `verification_status`
--
ALTER TABLE `verification_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status_name` (`status_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access`
--
ALTER TABLE `access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `business_types`
--
ALTER TABLE `business_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consumers`
--
ALTER TABLE `consumers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `emergency_support_officers`
--
ALTER TABLE `emergency_support_officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `polices`
--
ALTER TABLE `polices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `verification_status`
--
ALTER TABLE `verification_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businesses`
--
ALTER TABLE `businesses`
  ADD CONSTRAINT `businesses_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `consumers` (`id`),
  ADD CONSTRAINT `businesses_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `business_types` (`id`),
  ADD CONSTRAINT `businesses_ibfk_3` FOREIGN KEY (`verification_status_id`) REFERENCES `verification_status` (`id`),
  ADD CONSTRAINT `businesses_ibfk_4` FOREIGN KEY (`verification_officer_id`) REFERENCES `polices` (`id`);

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`id`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`eso_id`) REFERENCES `emergency_support_officers` (`id`);

--
-- Constraints for table `consumers`
--
ALTER TABLE `consumers`
  ADD CONSTRAINT `consumers_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `logins` (`id`);

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`);

--
-- Constraints for table `emergency_support_officers`
--
ALTER TABLE `emergency_support_officers`
  ADD CONSTRAINT `emergency_support_officers_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `logins` (`id`);

--
-- Constraints for table `logins`
--
ALTER TABLE `logins`
  ADD CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `logins_ibfk_2` FOREIGN KEY (`access_id`) REFERENCES `access` (`id`);

--
-- Constraints for table `polices`
--
ALTER TABLE `polices`
  ADD CONSTRAINT `polices_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `logins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
