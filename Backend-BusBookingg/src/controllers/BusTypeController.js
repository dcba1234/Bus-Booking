"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");

const table = "bus_type";

const getAll = 'SELECT `Id`, `Name`, `SeatNumber` FROM `bus_type` '

module.exports = {
  get: (req, res) => {
    let sql = getAll;
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getById: (req, res) => {
    if (req.params.id) {
      let sql = getAll + " and Id = ?";
      db.query(sql, [req.params.id], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  update: (req, res) => {
    let data = req.body;
    let Id = req.query.Id;
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO ${table} SET ?`;
    console.log(data)
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let data = req.query;
    let sql = `DELETE FROM ${table} WHERE Id = ?`;
    console.log(data)
    db.query(sql, [data.Id], (err, response) => {
      if (err) throw err;
      res.json(req.params);
    });
  }
};
