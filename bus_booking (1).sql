-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 13, 2020 lúc 01:52 AM
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
-- Cấu trúc bảng cho bảng `bus`
--

CREATE TABLE `bus` (
  `Id` int(11) NOT NULL,
  `Number` varchar(15) NOT NULL,
  `TypeId` int(11) NOT NULL,
  `DriverId` int(11) NOT NULL,
  `IsEnable` tinyint(1) NOT NULL DEFAULT 1,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus`
--

INSERT INTO `bus` (`Id`, `Number`, `TypeId`, `DriverId`, `IsEnable`, `modifiedBy`, `modifiedOn`) VALUES
(1, '29A - 7281.29', 1, 3, 1, 2, '2020-07-12T17:22:44.409Z'),
(2, '28B-2323.1', 10, 2, 0, NULL, NULL),
(3, '321231', 1, 3, 1, 2, '2020-07-12T15:38:30.131Z'),
(4, '321231', 1, 3, 1, 2, '2020-07-12T15:38:30.132Z'),
(5, '1324', 10, 2, 1, 2, '2020-07-12T17:22:53.836Z'),
(6, '123', 10, 3, 1, 2, '2020-07-12T17:28:25.306Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bus_history`
--

CREATE TABLE `bus_history` (
  `Id` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `Number` varchar(15) NOT NULL,
  `TypeId` int(11) NOT NULL,
  `DriverId` int(11) NOT NULL,
  `action` varchar(15) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus_history`
--

INSERT INTO `bus_history` (`Id`, `ItemId`, `Number`, `TypeId`, `DriverId`, `action`, `modifiedBy`, `modifiedOn`) VALUES
(1, 0, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T16:53:51.809Z'),
(2, 0, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T16:54:28.193Z'),
(3, 0, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T16:55:25.056Z'),
(4, 1, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T16:58:03.202Z'),
(5, 0, '123', 1, 2, 'create', 2, '2020-07-12T17:19:53.709Z'),
(6, 1, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T17:22:00.791Z'),
(7, 0, '123', 10, 3, 'create', 2, '2020-07-12T17:22:07.942Z'),
(8, 1, '29A - 7281.29', 1, 3, 'update', 2, '2020-07-12T17:22:44.409Z'),
(9, 5, '1324', 10, 2, 'update', 2, '2020-07-12T17:22:53.836Z'),
(10, 0, '123', 1, 2, 'create', 2, '2020-07-12T17:23:19.873Z'),
(11, 0, '123', 10, 3, 'create', 2, '2020-07-12T17:25:07.986Z'),
(12, 0, '123', 1, 2, 'create', 2, '2020-07-12T17:26:10.303Z'),
(13, 0, '123', 10, 3, 'create', 2, '2020-07-12T17:28:25.306Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bus_locate`
--

CREATE TABLE `bus_locate` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Locate` varchar(255) NOT NULL,
  `isParkingLot` tinyint(1) DEFAULT NULL,
  `IsEnable` tinyint(1) NOT NULL DEFAULT 1,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus_locate`
--

INSERT INTO `bus_locate` (`Id`, `Name`, `Locate`, `isParkingLot`, `IsEnable`, `modifiedBy`, `modifiedOn`) VALUES
(1, 'Công viên hòa bình', '21.066199671656328,105.78650593757631', NULL, 1, NULL, NULL),
(3, 'Âu cơ - Lạc Long Quân', '21.07376838647649,105.79994916915895', NULL, 1, NULL, NULL),
(4, 'Thủ Lệ', '21.089905682201746,105.77557325363159', NULL, 1, NULL, NULL),
(5, 'Cửa Bắc - Kim Mã ', '21.089905682201746,105.77557325363159', NULL, 1, NULL, NULL),
(6, 'Mê Linh - Khu công nghiệp Thăng Long ', '21.08570134466437,105.77407121658327', NULL, 1, 2, '2020-07-12T15:48:00.929Z'),
(7, 'Nhà máy bê tông chèmm', '21.084860462881075,105.7746720314026', NULL, 1, 2, '2020-07-12T15:50:15.638Z'),
(8, 'Công viên nghĩa đô', '21.04040708540458,105.79587221145631', NULL, 1, NULL, NULL),
(9, 'Tây Hồ', '21.064317444678004,105.82529067993165', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bus_route`
--

CREATE TABLE `bus_route` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `BusId` int(11) NOT NULL,
  `FirstLocateId` int(11) NOT NULL,
  `EndLocateId` int(11) NOT NULL,
  `ParkingFee` int(11) NOT NULL,
  `ParkingLot` varchar(255) NOT NULL,
  `DepartureTime` varchar(40) NOT NULL,
  `ArriveTime` varchar(40) NOT NULL,
  `IsShuffer` tinyint(1) DEFAULT NULL,
  `IsEnable` tinyint(1) NOT NULL,
  `SeatCount` int(11) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus_route`
--

INSERT INTO `bus_route` (`Id`, `Name`, `BusId`, `FirstLocateId`, `EndLocateId`, `ParkingFee`, `ParkingLot`, `DepartureTime`, `ArriveTime`, `IsShuffer`, `IsEnable`, `SeatCount`, `modifiedBy`, `modifiedOn`) VALUES
(1, 'Tuyến 1.2', 1, 1, 9, 10000, 'GỬi xe ở số nhà 231 ngõ 11 ', '2020-06-25T16:27:05.626Z', '2020-06-25T16:27:05.626Z', 0, 0, 40, NULL, NULL),
(2, 'Tuyến 2.1', 2, 5, 1, 0, 'sefsefsef', '2020-06-28T15:22:36.160Z', '2020-06-28T15:22:36.160Z', 0, 1, NULL, 2, '2020-07-12T17:34:23.542Z'),
(3, 'Tuyến 3', 2, 1, 3, 2147483647, '234234', '2020-06-28T15:27:51.243Z', '2020-06-28T15:27:51.243Z', 0, 1, NULL, NULL, NULL),
(5, 'Tuyến 1.5', 2, 1, 3, 2147483647, '234234', '2020-06-28T10:54:19.326Z', '2020-06-28T15:27:51.243Z', 0, 1, NULL, NULL, NULL),
(6, 'Tuyến 1.5', 2, 1, 3, 2147483647, '234234', '2020-06-28T10:54:19.326Z', '2020-06-28T15:27:51.243Z', 0, 1, NULL, NULL, NULL),
(7, 'Tuyến 7.1', 2, 3, 4, 0, '2342424', '2020-06-28T16:08:56.223Z', '2020-06-28T16:08:56.223Z', 0, 1, NULL, NULL, NULL),
(8, '123', 1, 1, 1, 0, '123', '2020-07-12T17:43:17.688Z', '2020-07-12T17:43:17.688Z', NULL, 1, NULL, 2, '2020-07-12T17:43:24.829Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bus_route_history`
--

CREATE TABLE `bus_route_history` (
  `Id` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `BusId` int(11) NOT NULL,
  `FirstLocateId` int(11) NOT NULL,
  `EndLocateId` int(11) NOT NULL,
  `ParkingFee` int(11) NOT NULL,
  `ParkingLot` varchar(255) NOT NULL,
  `DepartureTime` varchar(40) NOT NULL,
  `ArriveTime` varchar(40) NOT NULL,
  `IsShuffer` tinyint(1) DEFAULT NULL,
  `action` varchar(40) NOT NULL,
  `SeatCount` int(11) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus_route_history`
--

INSERT INTO `bus_route_history` (`Id`, `ItemId`, `Name`, `BusId`, `FirstLocateId`, `EndLocateId`, `ParkingFee`, `ParkingLot`, `DepartureTime`, `ArriveTime`, `IsShuffer`, `action`, `SeatCount`, `modifiedBy`, `modifiedOn`) VALUES
(2, 2, 'Tuyến 2.1', 2, 5, 1, 0, 'sefsefsef', '2020-06-28T15:22:36.160Z', '2020-06-28T15:22:36.160Z', NULL, 'update', NULL, 2, '2020-07-12T17:34:23.542Z'),
(3, 0, '123', 1, 1, 1, 0, '123', '2020-07-12T17:43:17.688Z', '2020-07-12T17:43:17.688Z', NULL, 'create', NULL, 2, '2020-07-12T17:43:24.829Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bus_type`
--

CREATE TABLE `bus_type` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `SeatNumber` int(11) NOT NULL,
  `IsEnable` tinyint(1) NOT NULL DEFAULT 1,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bus_type`
--

INSERT INTO `bus_type` (`Id`, `Name`, `SeatNumber`, `IsEnable`, `modifiedBy`, `modifiedOn`) VALUES
(1, 'Xe Nhỏ', 20, 1, 2, '2020-07-12T16:07:07.003Z'),
(10, 'xe to', 50, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `registration_phase`
--

CREATE TABLE `registration_phase` (
  `Id` int(11) NOT NULL,
  `StartTime` varchar(40) NOT NULL,
  `EndTime` varchar(40) NOT NULL,
  `IsEnable` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request`
--

CREATE TABLE `request` (
  `Id` int(11) NOT NULL,
  `RequesterId` int(11) NOT NULL,
  `RequestDate` varchar(40) NOT NULL,
  `StartDate` varchar(40) NOT NULL,
  `ExpireDate` varchar(40) NOT NULL,
  `IsEnable` tinyint(1) DEFAULT NULL,
  `IsShuffer` tinyint(1) DEFAULT NULL,
  `Status` varchar(11) NOT NULL,
  `routeId` int(11) NOT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `request`
--

INSERT INTO `request` (`Id`, `RequesterId`, `RequestDate`, `StartDate`, `ExpireDate`, `IsEnable`, `IsShuffer`, `Status`, `routeId`, `modifiedBy`, `modifiedOn`) VALUES
(5, 2, '', '2020-06-02T16:21:59.175Z', '2020-06-11T16:21:59.175Z', NULL, NULL, 'applied', 1, NULL, NULL),
(6, 3, '2020-06-29T16:29:24.845Z', '2020-06-03T16:29:17.867Z', '2020-06-11T16:29:17.867Z', NULL, NULL, 'rejected', 3, NULL, NULL),
(7, 4, '2020-06-30T14:07:47.614Z', '2020-06-09T14:07:42.382Z', '2020-06-11T14:07:42.382Z', NULL, NULL, 'applied', 1, NULL, NULL),
(8, 4, '2020-06-30T14:09:56.382Z', '2020-06-01T14:09:48.433Z', '2020-06-19T14:09:48.433Z', NULL, NULL, 'applied', 1, NULL, NULL),
(9, 4, '2020-06-30T14:34:52.614Z', '2020-06-01T14:34:46.219Z', '2020-06-02T14:34:46.219Z', NULL, NULL, 'applied', 1, NULL, NULL),
(10, 4, '2020-06-30T14:50:09.168Z', '2020-06-02T14:50:00.205Z', '2020-06-18T14:50:00.205Z', NULL, NULL, 'applied', 1, NULL, NULL),
(11, 2, '2020-06-30T14:54:19.060Z', '2020-06-01T14:54:14.754Z', '2020-06-11T14:54:14.754Z', NULL, NULL, 'applied', 1, NULL, NULL),
(12, 2, '2020-06-30T15:31:46.611Z', '2020-06-20T15:31:38.478Z', '2020-07-20T15:31:38.478Z', NULL, NULL, 'pending', 2, 2, '2020-07-12T17:54:16.049Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Account` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `BirthDay` varchar(40) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `isManager` tinyint(1) NOT NULL,
  `isDriver` tinyint(1) NOT NULL,
  `RouteResgisterId` int(11) DEFAULT NULL,
  `IsEnable` tinyint(1) NOT NULL DEFAULT 1,
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedOn` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`Id`, `Account`, `Password`, `Name`, `BirthDay`, `Gender`, `PhoneNumber`, `isManager`, `isDriver`, `RouteResgisterId`, `IsEnable`, `modifiedBy`, `modifiedOn`) VALUES
(2, 'ThanhNNT', 'thanhthanh12', 'Nguyễn Như Tiến Thành', '1998-07-20T17:00:00.000Z', 'Male', '0962612711', 1, 1, 2, 1, 2, '2020-07-12T16:07:04.555Z'),
(3, 'Driver1', 'thanhthanh12', 'Nguyễn Anh Em', '1991-07-06T17:00:00.000Z', 'Male', '0927348163', 0, 1, NULL, 1, NULL, NULL),
(4, 'ThanhNNT2', 'thanhthanh12', 'Nguyễn Thành', '2020-06-09T01:56:08.931Z', 'Male', '213', 0, 1, 1, 1, NULL, NULL),
(5, 'á1', 'á1', 'Harry Dong', '2020-06-02T02:55:53.703Z', 'Female', '123', 0, 1, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_register_history`
--

CREATE TABLE `user_register_history` (
  `Id` int(11) NOT NULL,
  `BusRouteId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ModifiedOn` varchar(100) NOT NULL,
  `ModifiedBy` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user_register_history`
--

INSERT INTO `user_register_history` (`Id`, `BusRouteId`, `UserId`, `ModifiedOn`, `ModifiedBy`) VALUES
(1, 2, 2, '2020-07-12T17:54:16.049Z', '2');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `bus_history`
--
ALTER TABLE `bus_history`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `bus_locate`
--
ALTER TABLE `bus_locate`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `bus_route`
--
ALTER TABLE `bus_route`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `bus_route_history`
--
ALTER TABLE `bus_route_history`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `bus_type`
--
ALTER TABLE `bus_type`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `registration_phase`
--
ALTER TABLE `registration_phase`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `user_register_history`
--
ALTER TABLE `user_register_history`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bus`
--
ALTER TABLE `bus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `bus_history`
--
ALTER TABLE `bus_history`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `bus_locate`
--
ALTER TABLE `bus_locate`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `bus_route`
--
ALTER TABLE `bus_route`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `bus_route_history`
--
ALTER TABLE `bus_route_history`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `bus_type`
--
ALTER TABLE `bus_type`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `registration_phase`
--
ALTER TABLE `registration_phase`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `request`
--
ALTER TABLE `request`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `user_register_history`
--
ALTER TABLE `user_register_history`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
