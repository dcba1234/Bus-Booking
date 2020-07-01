"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");

const table = "bus_locate";

const getAll =
  "SELECT `Id`, `Name`, `Locate`, `isParkingLot` FROM `bus_locate`";

module.exports = {
  get: (req, res) => {
    let sql = getAll;
    if (req.query.name) {
      sql = getAll;
    }
    db.query(sql, (err, response) => {
      if (err) throw err;
      console.log(response)
      res.json(response);
    });
  },
  getByName: (req, res) => {
    if (req.params.number) {
      let sql = getAll + " and Name = ?";
      db.query(sql, [req.query.name], (err, response) => {
        if (err) throw err;
        //if(!!!response[0]) res.json([])
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  update: async (req, res) => {
    let data = req.body;
    let Id = req.params.id;
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  store: async (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO ${table} SET ?`;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${table} WHERE Id = ?`;

    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Đã xóa thành công!" });
    });
  },
};
