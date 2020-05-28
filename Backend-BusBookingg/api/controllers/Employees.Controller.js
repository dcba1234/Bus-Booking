"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../db");

const table = "employees";

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM employees";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },

  //gọi hàm đấy bên này thì dùng call xong cho truyền dữ liệu vào cho nó kiểu gfi ạ
  detail: (req, res) => {
    if (req.params.Id) {
      // let sql = "SELECT * FROM employees  WHERE Id = ?";
      let sql = "call getById(?)";
      db.query(sql, [req.params.Id], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
      });
    } else res.json("khong có dữ liệu");
  },
  update: (req, res) => {
    let data = req.body;
    let Id = req.params.Id;
    let sql = "UPDATE employees SET ? WHERE Id = ?";
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO employees SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert success!" });
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM employees WHERE Id = ?";
    db.query(sql, [req.params.Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  }
  // getId :()
};
