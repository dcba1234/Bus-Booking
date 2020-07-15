-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 15, 2020 lúc 02:56 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bus_booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `route_locate`
--

CREATE TABLE `route_locate` (
  `Id` int(11) NOT NULL,
  `locateId` int(11) NOT NULL,
  `modifiedOn` varchar(40) NOT NULL,
  `modifiedBy` int(11) NOT NULL,
  `routeId` int(11) NOT NULL,
  `ArriveTime` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `route_locate`
--

INSERT INTO `route_locate` (`Id`, `locateId`, `modifiedOn`, `modifiedBy`, `routeId`, `ArriveTime`) VALUES
(1, 11, '2020-07-14T14:56:53.463Z', 1, 1, '1991-07-07T00:50:00.000Z'),
(2, 12, '2020-07-14T14:56:53.463Z', 1, 1, '1991-07-07T01:20:00.000Z');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `route_locate`
--
ALTER TABLE `route_locate`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `route_locate`
--
ALTER TABLE `route_locate`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
