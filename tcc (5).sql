-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Oct 05, 2026 at 03:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tcc`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinic_visits`
--

CREATE TABLE `clinic_visits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED DEFAULT NULL,
  `faculty_id` bigint(20) UNSIGNED DEFAULT NULL,
  `staff_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nurse_id` bigint(20) UNSIGNED DEFAULT NULL,
  `visit_date` date NOT NULL,
  `reason` varchar(255) NOT NULL,
  `symptoms` text DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `blood_pressure` varchar(255) DEFAULT NULL,
  `assessment` text DEFAULT NULL,
  `treatment` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `medicine_id` bigint(20) UNSIGNED DEFAULT NULL,
  `medicine_quantity` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clinic_visits`
--

INSERT INTO `clinic_visits` (`id`, `student_id`, `faculty_id`, `staff_id`, `nurse_id`, `visit_date`, `reason`, `symptoms`, `temperature`, `blood_pressure`, `assessment`, `treatment`, `remarks`, `created_at`, `updated_at`, `medicine_id`, `medicine_quantity`) VALUES
(8, 6, NULL, NULL, 1, '2026-09-18', 'Headache', 'dwqdwa', '35', '160', 'wdawdwa', 'Medication', 'dawdaw', '2026-09-18 01:39:48', '2026-09-18 01:39:48', 1, 1),
(9, 6, NULL, NULL, 1, '2026-09-20', 'Fever', NULL, NULL, NULL, NULL, 'Medication', NULL, '2026-09-20 16:45:54', '2026-09-22 11:34:14', 2, 1),
(10, 7, NULL, NULL, 1, '2026-09-20', 'Headache', NULL, '35', NULL, NULL, 'Medication', NULL, '2026-09-20 16:50:53', '2026-09-20 16:50:53', 2, 54),
(11, 9, NULL, NULL, 1, '2026-09-22', 'Stomach', NULL, '35', '160', NULL, 'Medication', NULL, '2026-09-22 10:52:23', '2026-09-22 10:52:23', 2, 22),
(12, NULL, NULL, 2, 1, '2026-09-24', 'Headache', NULL, NULL, NULL, NULL, 'Medication', NULL, '2026-09-24 15:08:39', '2026-09-24 15:08:39', 7, 1),
(13, NULL, 1, NULL, 2, '2026-09-24', 'Headache', NULL, NULL, 'wsdawd', NULL, 'Medication', NULL, '2026-09-24 15:36:07', '2026-09-24 15:36:07', 5, 1),
(15, 9, NULL, NULL, 1, '2026-10-01', 'Fever', NULL, NULL, NULL, NULL, 'First Aid', NULL, '2026-09-29 11:28:29', '2026-09-29 11:28:29', 16, 1),
(16, NULL, 3, NULL, 2, '2026-10-04', 'Injury / Wound', NULL, NULL, NULL, NULL, 'Wound Care', NULL, '2026-10-04 14:34:11', '2026-10-04 14:34:11', 42, 5);

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `employee_id`, `first_name`, `middle_name`, `last_name`, `position`, `department`, `sex`, `birth_date`, `contact_number`, `address`, `created_at`, `updated_at`) VALUES
(1, 'FAC 001', 'Romy', NULL, 'Tadlas', 'INSTRUCTOR', NULL, 'Male', '2006-05-02', '09365041373', 'Baluarte Tagoloan', '2026-09-24 15:35:45', '2026-09-24 15:35:45'),
(2, 'FAC 002', 'Ralph', 'Christian', 'Sabandal', 'INSTRUCTOR', NULL, 'Male', '2006-05-20', '09365041373', 'Baluarte Tagoloan', '2026-09-28 10:12:59', '2026-09-28 10:12:59'),
(3, 'FAC 003', 'angel stacee', NULL, 'tabligan', 'Dean', NULL, 'Female', '2006-05-07', '09959048004', 'Napocor Natumolan 20B', '2026-10-04 14:32:06', '2026-10-04 14:32:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `treatment_type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) NOT NULL DEFAULT 'Tablet',
  `stock` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `minimum_stock` int(10) UNSIGNED NOT NULL DEFAULT 10,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `medicine_name`, `treatment_type`, `unit`, `stock`, `minimum_stock`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Paracetamol', 'Medication', 'Tablet', 150, 20, NULL, '2026-09-16 20:58:16', '2026-09-26 14:04:56'),
(2, 'Neozep', 'Medication', 'Piece', 100, 20, NULL, '2026-09-18 13:45:00', '2026-09-22 11:34:14'),
(3, 'Ibuprofen', 'Medication', 'Tablet', 100, 20, NULL, '2026-09-22 10:58:29', '2026-09-22 11:24:15'),
(4, 'Cetirizine', 'Medication', 'Tablet', 100, 20, NULL, '2026-09-22 10:58:42', '2026-09-22 11:24:18'),
(5, 'Loratadine', 'Medication', 'Tablet', 99, 20, NULL, '2026-09-22 10:58:50', '2026-09-24 15:36:07'),
(7, 'Antacid', 'Medication', 'Tablet', 99, 20, NULL, '2026-09-22 10:59:07', '2026-09-29 11:25:29'),
(8, 'Povidone-Iodine', 'Wound Care', 'Bottle', 100, 20, NULL, '2026-09-22 10:59:17', '2026-09-22 11:24:47'),
(9, 'Antiseptic solution', 'Wound Care', 'Bottle', 100, 20, NULL, '2026-09-22 10:59:25', '2026-09-22 11:24:52'),
(10, 'Normal Saline (0.9% NaCl)', 'Wound Care', 'Bottle', 100, 20, NULL, '2026-09-22 10:59:34', '2026-09-22 11:25:02'),
(11, 'Hydrogen Peroxide', 'Wound Care', 'Bottle', 100, 20, NULL, '2026-09-22 10:59:43', '2026-09-22 11:25:07'),
(12, 'Calamine Lotion', 'Wound Care', 'Bottle', 100, 20, NULL, '2026-09-22 10:59:51', '2026-09-22 11:25:11'),
(13, 'Topical antibiotic ointment', 'Wound Care', 'Tube', 100, 20, NULL, '2026-09-22 10:59:58', '2026-09-22 11:25:16'),
(14, 'Hydrocortisone 1% cream', 'Wound Care', 'Tube', 100, 20, NULL, '2026-09-22 11:00:07', '2026-09-22 11:25:20'),
(16, 'Oral glucose/glucose gel', 'First Aid', 'Pack', 99, 20, NULL, '2026-09-22 11:00:22', '2026-09-29 11:28:29'),
(17, 'Adhesive Bandage', 'First Aid', 'pieces', 100, 20, 'For covering small cuts and abrasions', NULL, NULL),
(18, 'Gauze Pads', 'First Aid', 'pieces', 100, 20, 'For covering and dressing wounds', NULL, NULL),
(19, 'Medical Tape', 'First Aid', 'rolls', 100, 20, 'For securing wound dressings', NULL, NULL),
(20, 'Cotton Balls', 'First Aid', 'packs', 100, 20, 'For cleaning and applying antiseptic', NULL, NULL),
(21, 'Alcohol Pads', 'First Aid', 'pieces', 100, 20, 'For skin preparation', NULL, NULL),
(22, 'Disposable Gloves', 'First Aid', 'pairs', 100, 20, 'For basic first aid procedures', NULL, NULL),
(23, 'Elastic Bandage', 'First Aid', 'rolls', 100, 20, 'For supporting minor injuries', NULL, NULL),
(24, 'Instant Cold Pack', 'Cold Compress', 'pieces', 100, 20, 'For immediate first aid of minor injuries', NULL, NULL),
(30, 'Oral Rehydration Solution', 'Medication', 'sachets', 100, 20, 'For fluid replacement during dehydration', NULL, NULL),
(32, 'Mefenamic Acid', 'Medication', 'tablets', 100, 20, 'For pain when appropriate', NULL, NULL),
(33, 'Loperamide', 'Medication', 'tablets', 100, 20, 'For diarrhea when appropriate', NULL, NULL),
(34, 'Simethicone', 'Medication', 'tablets', 100, 20, 'For gas and bloating', NULL, NULL),
(37, 'Normal Saline 0.9%', 'Wound Care', 'bottles', 100, 20, 'For wound irrigation', NULL, NULL),
(42, 'Burn Gel', 'Wound Care', 'Tube', 95, 20, 'For minor burns', NULL, '2026-10-04 14:34:11'),
(44, 'Reusable Cold Pack', 'Cold Compress', 'pieces', 100, 20, 'For cold compress application', NULL, NULL),
(45, 'Ice Pack', 'Cold Compress', 'pieces', 100, 20, 'For cold compress application', NULL, NULL),
(46, 'Reusable Hot Pack', 'Hot Compress', 'pieces', 100, 20, 'For hot compress application', NULL, NULL),
(47, 'Warm Compress Pack', 'Hot Compress', 'pieces', 100, 20, 'For warm compress application', NULL, NULL),
(48, 'Hot Water Bag', 'Hot Compress', 'pieces', 100, 20, 'For warm compress application', NULL, NULL),
(49, 'Reusable Hot Pack', 'Hot Compress', 'pieces', 100, 20, 'For hot compress application', NULL, NULL),
(50, 'Warm Compress Pack', 'Hot Compress', 'pieces', 100, 20, 'For warm compress application', NULL, NULL),
(51, 'Hot Water Bag', 'Hot Compress', 'pieces', 100, 20, 'For hot compress application', NULL, NULL),
(52, 'Reusable Hot Pack', 'Hot Compress', 'pieces', 100, 20, 'For hot compress application', NULL, NULL),
(53, 'Warm Compress Pack', 'Hot Compress', 'pieces', 100, 20, 'For warm compress application', NULL, NULL),
(54, 'Hot Water Bag', 'Hot Compress', 'pieces', 100, 20, 'For hot compress application', NULL, NULL),
(55, 'Cetirizine', 'Medication', 'Tablet', 0, 155, NULL, '2026-09-29 11:28:47', '2026-10-04 14:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_09_15_124632_create_students_table', 2),
(5, '2026_09_15_124702_create_staff_table', 2),
(6, '2026_09_15_124707_create_visits_table', 2),
(7, '2026_09_15_124723_create_medical_records_table', 2),
(8, '2026_09_15_124726_create_medications_table', 2),
(9, '2026_09_15_124729_create_medication_records_table', 2),
(10, '2026_09_15_124732_create_health_services_table', 2),
(11, '2026_09_15_124735_create_announcements_table', 2),
(12, '2026_09_15_124737_create_activity_logs_table', 2),
(13, '2026_09_15_125746_create_personal_access_tokens_table', 3),
(14, '2026_09_15_133251_create_clinic_visits_table', 4),
(15, '2026_09_16_115546_add_profile_picture_to_users_table', 5),
(16, '2026_09_16_124504_add_role_to_users_table', 6),
(17, '2026_09_16_135240_add_role_and_profile_picture_to_users_table', 7),
(18, '2026_09_16_155109_add_nurse_id_to_clinic_visits_table', 8),
(19, '2026_09_16_204937_create_medicines_table', 9),
(20, '2026_09_16_223828_add_staff_and_clinic_fields_to_clinic_visits_table', 10),
(21, '2026_09_16_230546_create_faculties_table', 11),
(22, '2026_09_16_230752_add_faculty_id_to_clinic_visits_table', 12),
(23, '2026_09_16_232829_add_employee_id_to_staff_table', 13),
(24, '2026_09_17_000428_add_middle_name_to_staff_table', 14),
(25, '2026_09_17_003531_add_faculty_and_medicine_quantity_to_clinic_visits_table', 15),
(26, '2026_09_22_111439_add_treatment_type_to_medicines_table', 16),
(27, '2026_09_24_150441_make_clinic_visit_patient_ids_nullable', 17),
(28, '2026_09_25_160000_add_google_id_to_users_table', 18),
(29, '2026_09_26_000000_remove_google_id_from_users_table', 19),
(30, '2026_09_26_010000_add_performance_indexes', 19),
(31, '2026_09_30_000000_add_directory_and_visit_lookup_indexes', 20);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'clinic-system-token', '7345112bd1182aefa168098de32ac86ad96aadf93a0810a9dc71d963e1ff6c96', '[\"*\"]', NULL, NULL, '2026-09-15 15:53:28', '2026-09-15 15:53:28'),
(3, 'App\\Models\\User', 1, 'clinic-system-token', '2333de566672abf6d5c8650ae74019cd98a6d49f4fd28b5dd08dbf8629741291', '[\"*\"]', NULL, NULL, '2026-09-15 15:55:39', '2026-09-15 15:55:39'),
(4, 'App\\Models\\User', 1, 'clinic-system-token', 'b4b92a27cdada0fc553d10c20c62a1ad6e75a6b9835434d4bd90e891a4ba06e7', '[\"*\"]', NULL, NULL, '2026-09-15 15:56:47', '2026-09-15 15:56:47'),
(6, 'App\\Models\\User', 1, 'clinic-system-token', '68ff1594835ff84937c735f14e20bbf64e8e80d9ab95c4b5a98e990f655ce499', '[\"*\"]', NULL, NULL, '2026-09-15 16:30:51', '2026-09-15 16:30:51'),
(8, 'App\\Models\\User', 1, 'clinic-system-token', '17d10f7dd8398e3d8bbf25f8ed972b419536e924af7fa6cad85b8963be54b1e9', '[\"*\"]', NULL, NULL, '2026-09-15 16:55:37', '2026-09-15 16:55:37'),
(9, 'App\\Models\\User', 1, 'clinic-system-token', '50c3f782946a467fb0ae3403a7c1cf5eeff4151c7f643149659a490b7c25fa12', '[\"*\"]', NULL, NULL, '2026-09-15 17:15:56', '2026-09-15 17:15:56'),
(10, 'App\\Models\\User', 1, 'clinic-system-token', 'b8f1c5f02dc4ae05a00a94608ed2c845fa6d7cb9c28ce6934c7c4c1b34a06be6', '[\"*\"]', NULL, NULL, '2026-09-15 17:25:11', '2026-09-15 17:25:11'),
(12, 'App\\Models\\User', 1, 'clinic-system-token', '865bfb14a85a8885cd6fd1869d737a8a25a6e6d5cca625389d93f3f7f90a93ae', '[\"*\"]', NULL, NULL, '2026-09-15 17:45:34', '2026-09-15 17:45:34'),
(15, 'App\\Models\\User', 1, 'clinic-system-token', '13602623e2eaef24ca9727be7f422a477b14a98ec6d57d087992ca8354291886', '[\"*\"]', NULL, NULL, '2026-09-16 11:46:04', '2026-09-16 11:46:04'),
(18, 'App\\Models\\User', 1, 'clinic-system-token', 'cfc9013b56f853d180ef2f1912e6cc60ac4319fe658fa4129c8b0fe41f91e255', '[\"*\"]', '2026-09-16 12:17:48', NULL, '2026-09-16 12:14:58', '2026-09-16 12:17:48'),
(22, 'App\\Models\\User', 1, 'clinic-system-token', '88a36171e6fba9fc982d0adfb84b8f8812bb98208691c1049d426fa21332c2ac', '[\"*\"]', '2026-09-16 13:02:08', NULL, '2026-09-16 13:01:29', '2026-09-16 13:02:08'),
(23, 'App\\Models\\User', 1, 'clinic-system-token', 'a8d228abbd82f4579392785f52af1c6140cb74790150720433c3fb3b06b615c6', '[\"*\"]', '2026-09-16 12:31:19', NULL, '2026-09-16 12:31:04', '2026-09-16 12:31:19'),
(24, 'App\\Models\\User', 1, 'clinic-system-token', 'cd2d4e67b6c499060d43d3f356144a80e2c196df4f300be93d6246683cf5f4a0', '[\"*\"]', NULL, NULL, '2026-09-16 12:31:06', '2026-09-16 12:31:06'),
(25, 'App\\Models\\User', 1, 'clinic-system-token', '2eeec944071f13db94106107ee6edde63cc6ecd70ea3e777fc8fcb9d7dcf09b3', '[\"*\"]', '2026-09-16 12:31:21', NULL, '2026-09-16 12:31:11', '2026-09-16 12:31:21'),
(26, 'App\\Models\\User', 1, 'clinic-system-token', 'ec6524c595c871148d0178e085a17e24e280fa4f41c58f684c5bf1916c591ee5', '[\"*\"]', '2026-09-16 12:31:21', NULL, '2026-09-16 12:31:12', '2026-09-16 12:31:21'),
(27, 'App\\Models\\User', 1, 'clinic-system-token', 'a8aa0d3c0bb32730ac8145887b384cc41758088b73d7d53a18e41d00e77621ac', '[\"*\"]', NULL, NULL, '2026-09-16 12:31:13', '2026-09-16 12:31:13'),
(30, 'App\\Models\\User', 1, 'clinic-system-token', '05e2c733f39076e43b9802e5ed81fc9768d804ccf182293ca1c47d82d0e9ac6f', '[\"*\"]', '2026-09-16 14:42:27', NULL, '2026-09-16 14:42:24', '2026-09-16 14:42:27'),
(35, 'App\\Models\\User', 1, 'clinic-system-token', '6d0c76ff511232369a535c415c957a63c655038a812d71e2b28738f68f7ce3a7', '[\"*\"]', '2026-09-16 14:05:26', NULL, '2026-09-16 14:03:55', '2026-09-16 14:05:26'),
(40, 'App\\Models\\User', 1, 'clinic-system-token', 'c8b67403f9a781508bc7a2c97f40386f2a673f243e20ca9aef86d6ad053b1692', '[\"*\"]', '2026-09-16 18:08:28', NULL, '2026-09-16 16:52:13', '2026-09-16 18:08:28'),
(41, 'App\\Models\\User', 1, 'clinic-system-token', '16d8b9c7c05fb12f302d6d7c1180460f3282618d72ad7f090bf54c6e809b727d', '[\"*\"]', '2026-09-16 17:42:43', NULL, '2026-09-16 17:39:47', '2026-09-16 17:42:43'),
(42, 'App\\Models\\User', 1, 'clinic-system-token', '55893ffa0bca8cdd17ac30692618da2b63fc35121f5f4740ecfad798d7027c17', '[\"*\"]', '2026-09-16 18:07:35', NULL, '2026-09-16 18:06:55', '2026-09-16 18:07:35'),
(43, 'App\\Models\\User', 1, 'clinic-system-token', '2aa6dbd34263bb06f7ce72167b4c95bd534d15405faf579d65688b2638004714', '[\"*\"]', '2026-09-16 20:55:15', NULL, '2026-09-16 20:18:08', '2026-09-16 20:55:15'),
(45, 'App\\Models\\User', 1, 'clinic-system-token', '584472256611e8976ab5d00cdba4c8f4a890c1ab57dcdb04619ec545a6876aad', '[\"*\"]', NULL, NULL, '2026-09-18 00:34:48', '2026-09-18 00:34:48'),
(48, 'App\\Models\\User', 1, 'clinic-system-token', '0934f71d6e6f6963acc26cb10ca066b75e3f632f47460b9987f208c6c3873532', '[\"*\"]', '2026-09-18 18:19:08', NULL, '2026-09-18 16:08:18', '2026-09-18 18:19:08'),
(49, 'App\\Models\\User', 1, 'clinic-system-token', 'fd8c4d7d0a138d04419e310fa09463a8ec4abce8ac88abc3db776b95b4baa093', '[\"*\"]', '2026-09-18 17:55:42', NULL, '2026-09-18 16:42:57', '2026-09-18 17:55:42'),
(51, 'App\\Models\\User', 1, 'clinic-system-token', '51a22faedc62908340c5f8e4148a5633dd9af6d0aa5f18042c5bbdab5b93b3d2', '[\"*\"]', '2026-09-20 16:07:00', NULL, '2026-09-20 16:05:03', '2026-09-20 16:07:00'),
(54, 'App\\Models\\User', 1, 'clinic-system-token', '82d141e8d5f26b06184e99583aa5fa038bf9773839428dd47a2162190defa5a4', '[\"*\"]', '2026-09-20 17:30:14', NULL, '2026-09-20 16:44:56', '2026-09-20 17:30:14'),
(55, 'App\\Models\\User', 1, 'clinic-system-token', '5c29553b7227805342aad72a4058734cbaa320b693971b13795a464e1673bd73', '[\"*\"]', '2026-09-20 19:06:03', NULL, '2026-09-20 19:01:40', '2026-09-20 19:06:03'),
(58, 'App\\Models\\User', 1, 'clinic-system-token', 'de5c51558d1814286099f37ae84f0858213fc3f95da7a8251e6b0cdd618df4b9', '[\"*\"]', '2026-09-22 13:21:55', NULL, '2026-09-22 09:53:00', '2026-09-22 13:21:55'),
(59, 'App\\Models\\User', 1, 'clinic-system-token', '49ab34dd0adf8a8404f296a179cca1dcc495639c3de4cd9702ebf23a24b3146c', '[\"*\"]', '2026-09-23 10:25:54', NULL, '2026-09-23 10:21:06', '2026-09-23 10:25:54'),
(60, 'App\\Models\\User', 1, 'clinic-system-token', '93a74655df06c0786ba303486f412d627ced0534e09c7178f14d62c277c3894c', '[\"*\"]', '2026-09-23 13:12:30', NULL, '2026-09-23 10:27:38', '2026-09-23 13:12:30'),
(61, 'App\\Models\\User', 1, 'clinic-system-token', 'c59a07d6ac304af44ec1a20aaeeff619bf25b2d5034c944f484fe4bb519044d6', '[\"*\"]', '2026-09-24 15:51:22', NULL, '2026-09-24 11:43:40', '2026-09-24 15:51:22'),
(62, 'App\\Models\\User', 1, 'clinic-system-token', 'd2c84920e016fa81d6d4789826e6a55a514b332a6d98b0a80bba5f0812cc788a', '[\"*\"]', '2026-09-24 16:44:15', NULL, '2026-09-24 16:12:25', '2026-09-24 16:44:15'),
(63, 'App\\Models\\User', 1, 'clinic-system-token', '239ecae3fda19da44c3520d97ea23f65b8fbeb3d871fa59d7bb15f69e047be1e', '[\"*\"]', '2026-09-25 14:11:30', NULL, '2026-09-25 12:11:42', '2026-09-25 14:11:30'),
(72, 'App\\Models\\User', 1, 'clinic-system-token', '431657b294cde417ba3829560282f2356831dcd9c4d43a3ebe09749aa92aa531', '[\"*\"]', '2026-09-25 15:33:18', NULL, '2026-09-25 15:33:16', '2026-09-25 15:33:18'),
(79, 'App\\Models\\User', 1, 'clinic-system-token', 'fcaa551f380041cb00830b62b007ed07fcbc4307b79f9f118679845dbcf41524', '[\"*\"]', '2026-09-26 12:24:12', NULL, '2026-09-26 12:24:08', '2026-09-26 12:24:12'),
(80, 'App\\Models\\User', 1, 'clinic-system-token', '317a1b3afa248ac048937e455ed1b2b7091525b46626b0bb14f8c0ab2cde318b', '[\"*\"]', '2026-09-26 12:33:54', NULL, '2026-09-26 12:33:44', '2026-09-26 12:33:54'),
(82, 'App\\Models\\User', 1, 'clinic-system-token', 'fc9f1abfccecf7a220c9937601f3a80dd017c179f162b4d04f1ad7d9b54b835d', '[\"*\"]', '2026-09-26 15:36:24', NULL, '2026-09-26 15:02:05', '2026-09-26 15:36:24'),
(84, 'App\\Models\\User', 1, 'clinic-system-token', 'b236841faf3f9d1aa8181d9a61eead12ee128f128615ba907aa58fb78640f307', '[\"*\"]', '2026-09-27 12:14:23', NULL, '2026-09-27 12:13:34', '2026-09-27 12:14:23'),
(85, 'App\\Models\\User', 1, 'clinic-system-token', '98ba42d30c00030b037a348d2e741d393a874b9b4727dbb1c57e761459ddd5c0', '[\"*\"]', '2026-09-27 12:14:09', NULL, '2026-09-27 12:13:55', '2026-09-27 12:14:09'),
(87, 'App\\Models\\User', 1, 'clinic-system-token', '41069d3f95fcfaca40909a1969fad852ae65914afd2c572cec1c970c26cfcfba', '[\"*\"]', '2026-09-29 11:31:06', NULL, '2026-09-29 10:44:21', '2026-09-29 11:31:06'),
(95, 'App\\Models\\User', 3, 'clinic-system-token', '2afb0ccbf32ec8557e72b4e95e5d99d545c24601c3ac4e436727775ad7fea6c1', '[\"*\"]', '2026-10-01 11:46:26', NULL, '2026-10-01 11:46:25', '2026-10-01 11:46:26'),
(97, 'App\\Models\\User', 3, 'clinic-system-token', '1138af1d610bd846927cec4f063fb0b4aef50f40ae1fb80d72d20336cd65e145', '[\"*\"]', '2026-10-01 14:41:50', NULL, '2026-10-01 14:41:39', '2026-10-01 14:41:50'),
(99, 'App\\Models\\User', 1, 'clinic-system-token', '9ecdb8001674bfd484d05d7ba57c57171caec309ff7375811c3fc0029465d690', '[\"*\"]', '2026-10-04 15:41:27', NULL, '2026-10-04 14:59:01', '2026-10-04 15:41:27'),
(103, 'App\\Models\\User', 1, 'clinic-system-token', '81943874a99588a4aab49db1c895bdb421ee4ccb7bb846d1909b5153ac7d789f', '[\"*\"]', '2026-10-05 13:20:19', NULL, '2026-10-05 13:04:15', '2026-10-05 13:20:19');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dpL8JtZLcCzK48dVjgy1n1QHG4ZI3o8kgzbiEMkZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVhCQlBOMURTTUdwQVdDaTZDejZjQm5ReTFZOVl1ck5hbXZvcUgzWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hdXRoL2dvb2dsZS9yZWRpcmVjdCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790354292),
('E9uEZxyxwXQHQX7ySvvzn54ilbk8nGjox7hufJsn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.139.1 Chrome/150.0.7871.250 Electron/43.6.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVUdrb1hOb3dMU2lYNzg3VG1aNFZSYzBqVms3WUVnS2tIMTM5YXhpSSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hdXRoL2dvb2dsZS9yZWRpcmVjdCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790425163),
('JQSvEuJ24vtC7H221eC8sc53J3G7iZMOSJXbZWHk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1pkMHcwcllaTGlVWEI5c3BqMGlYNmJQWUlTVlN0Uk5lTDRPSU9BQyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9yZXNldC1wYXNzd29yZCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790773487);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `sex` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `staff_id`, `first_name`, `middle_name`, `last_name`, `position`, `department`, `sex`, `birth_date`, `contact_number`, `address`, `created_at`, `updated_at`) VALUES
(2, '20201502', 'John Wrendell', NULL, 'DotDot', 'Staff', NULL, 'Male', '2006-05-20', '09955329502', 'Napocor Natumolan 20B', '2026-09-24 15:00:28', '2026-09-24 15:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `section` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `first_name`, `middle_name`, `last_name`, `course`, `year_level`, `section`, `sex`, `birth_date`, `contact_number`, `address`, `created_at`, `updated_at`) VALUES
(6, '20241209', 'angel stacee', NULL, 'tabligan', 'BSIT', '3rd Year', NULL, 'Male', '2006-09-05', '09959048004', 'Napocor Natumolan 20B', '2026-09-16 21:59:18', '2026-09-16 21:59:18'),
(7, '21312312312', 'Romy', NULL, 'Tadlas', 'BSBA', '1st Year', NULL, 'Male', '2006-05-20', '09365041373', 'Baluarte Tagoloan', '2026-09-20 16:45:15', '2026-09-20 16:45:15'),
(8, '2312312', 'Zaira', NULL, 'Estrada', 'BSIT', '1st Year', NULL, 'Male', '2202-05-20', '09959204231', 'Tagoloan Sto Nino', '2026-09-22 09:25:52', '2026-09-22 09:39:14'),
(9, '20201592', 'Kent', NULL, 'Estrada', 'BSIT', '3rd Year', NULL, 'Male', '2006-05-10', '09959204231', 'Tagoloan Sto Nino', '2026-09-22 09:40:59', '2026-09-22 09:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `profile_picture`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Angel', 'admin@tcc.edu.ph', 'Nurse', '/storage/avatars/avatar_1_1790260587.png', NULL, '$2y$12$087DcTOUIXFgkuxKs26qq.lQdtGnIjCM3MD0Ssh791DxJAv1JGt/S', NULL, '2026-09-15 15:46:54', '2026-09-30 12:52:48'),
(2, 'Ralph Christian', 'tcc_clinic@tcc.edu.ph', 'Nurse', NULL, NULL, '$2y$12$JnvbbFeHh8YlBNfhrEBha.jdjJ1EGHM4GRRi6ztee2fOgwkBCBI9W', NULL, '2026-09-16 15:42:35', '2026-09-16 15:42:35'),
(3, 'Ralph Sabandal', 'ralphsabandal02@gmail.com', 'Administrator', '/storage/avatars/avatar_3_1790773564.png', NULL, '$2y$12$.CKQS3W8CSvGQ9PHBIn3uOucAcSdavUvCVJKK4McSDzz8YjMiUtxG', NULL, '2026-09-25 15:42:00', '2026-09-30 13:06:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `clinic_visits`
--
ALTER TABLE `clinic_visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_visits_student_id_foreign` (`student_id`),
  ADD KEY `clinic_visits_nurse_id_foreign` (`nurse_id`),
  ADD KEY `clinic_visits_medicine_id_foreign` (`medicine_id`),
  ADD KEY `clinic_visits_faculty_id_foreign` (`faculty_id`),
  ADD KEY `clinic_visits_staff_id_index` (`staff_id`),
  ADD KEY `clinic_visits_visit_date_id_index` (`visit_date`,`id`),
  ADD KEY `visits_student_date_id_index` (`student_id`,`visit_date`,`id`),
  ADD KEY `visits_staff_date_id_index` (`staff_id`,`visit_date`,`id`),
  ADD KEY `visits_faculty_date_id_index` (`faculty_id`,`visit_date`,`id`),
  ADD KEY `visits_nurse_date_id_index` (`nurse_id`,`visit_date`,`id`),
  ADD KEY `visits_medicine_date_id_index` (`medicine_id`,`visit_date`,`id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `faculties_employee_id_unique` (`employee_id`),
  ADD KEY `faculties_first_name_index` (`first_name`),
  ADD KEY `faculties_middle_name_index` (`middle_name`),
  ADD KEY `faculties_last_name_index` (`last_name`),
  ADD KEY `faculties_last_name_id_index` (`last_name`,`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicines_medicine_name_index` (`medicine_name`),
  ADD KEY `medicines_treatment_type_index` (`treatment_type`),
  ADD KEY `medicines_unit_index` (`unit`),
  ADD KEY `medicines_created_at_id_index` (`created_at`,`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_staff_id_unique` (`staff_id`),
  ADD KEY `staff_first_name_index` (`first_name`),
  ADD KEY `staff_middle_name_index` (`middle_name`),
  ADD KEY `staff_last_name_index` (`last_name`),
  ADD KEY `staff_last_name_id_index` (`last_name`,`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_student_id_unique` (`student_id`),
  ADD KEY `students_first_name_index` (`first_name`),
  ADD KEY `students_middle_name_index` (`middle_name`),
  ADD KEY `students_last_name_index` (`last_name`),
  ADD KEY `students_course_index` (`course`),
  ADD KEY `students_year_level_index` (`year_level`),
  ADD KEY `students_section_index` (`section`),
  ADD KEY `students_sex_index` (`sex`),
  ADD KEY `students_created_at_id_index` (`created_at`,`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_index` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clinic_visits`
--
ALTER TABLE `clinic_visits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clinic_visits`
--
ALTER TABLE `clinic_visits`
  ADD CONSTRAINT `clinic_visits_faculty_id_foreign` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `clinic_visits_medicine_id_foreign` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `clinic_visits_nurse_id_foreign` FOREIGN KEY (`nurse_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `clinic_visits_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `clinic_visits_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
