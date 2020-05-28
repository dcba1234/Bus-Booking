"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");

const table = "bus";

const getAll = 'SELECT bus.Id, `Number`, `TypeId`, `DriverId`,user.Account as `driverAccount`,user.Name as `driverName`,user.PhoneNumber as `driverPhoneNumber`,bus_type.Name as `busType` FROM `bus`,`bus_type`,`user` WHERE bus.TypeId = bus_type.Id and bus.DriverId = user.Id'

module.exports = {
  get: (req, res) => {
    let sql = getAll;
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getBusByNumber: (req, res) => {
    if (req.params.number) {
      let sql = getAll + " and Number = ?";
      db.query(sql, [req.params.number], (err, response) => {
        if (err) throw err;
        //if(!!!response[0]) res.json([])
        res.json(response[0]);
        
      });
    } else res.json("không có dữ liệu");
  },
  update: (req, res) => {
    let data = req.body;
    let Id = req.params.Id;
    let sql = "UPDATE Department SET ? WHERE Id = ?";
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO department SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM department WHERE Id = ?";
 
    db.query(sql, [req.params.Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Đã xóa thành công!" });
    });
  }
};
