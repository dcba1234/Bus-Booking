"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const _ = require("lodash")
const table = "user";

const getDriver = 'SELECT `Id`, `Account`, `Name`, `BirthDay`, `Gender`, `PhoneNumber`, `RouteResgisterId` FROM `user` where isDriver = 1'

module.exports = {
  get: (req, res) => {
    let sql = getAll;
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getDriver: (req, res) => {
    let sql = getDriver;
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getDriverById: (req, res) => {
    if (req.params.id) {
      let sql = getAll + " and Id = ?";
      db.query(sql, [req.params.id], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  
  updateDriver: (req, res) => {
    res.status(409).json({error: 'Tên không hợp lệ'})
    return
    let data = req.body;
    let Id = req.params.id;
    if(data.Name.trim() == 0 || data.Account.trim() == 0) {
      res.json({error: 'Tên không hợp lệ'})
      return;
    }
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  storeDriver: (req, res) => {
      // just Name , account, birthday,gender, phonenumber

    let data = _.pick(req.body,['Account','Name','BirthDay','Gender','PhoneNumber']) ;
    if(data.Name.trim() == 0 || data.Account.trim() == 0) {
      res.json({error: 'Tên không hợp lệ'})
      return;
    }
    data.Password = data.Account;
    data.isDriver = 1;    
    let sql = `INSERT INTO ${table} SET ?`;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let data = req.params;
    let sql = `DELETE FROM ${table} WHERE Id = ?`;
    db.query(sql, [data.id], (err, response) => {
      if (err) throw err;
      res.json(req.params);
    });
  }
};


const checkIfExistAccount(Id){
  let sql = `DELETE FROM ${table} WHERE Id = ?`;
  db.query(sql, [data.id], (err, response) => {
    if (err) throw err;
    res.json(req.params);
  });
}