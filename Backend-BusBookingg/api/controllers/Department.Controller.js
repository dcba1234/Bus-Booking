"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../db");

const table = "department";

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM demo";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    if (req.params.Id) {
      let sql = "call getdepartmentById(?)";
      db.query(sql, [req.params.Id], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
        0;
      });
    } else res.json("khong có dữ liệu");
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
