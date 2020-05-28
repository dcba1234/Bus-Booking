"use strict";
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "tienthanh217",
  password: process.env.DB_PASSWORD || "thanhthanh12",
  database: process.env.DB_NAME || "bus_booking"
});
module.exports = db;
