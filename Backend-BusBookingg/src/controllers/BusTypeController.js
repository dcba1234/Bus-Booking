"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const jwtHelper = require("../helpers/jwt.helper");
const table = "bus_type";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret-tienthanh";
const getAll = 'SELECT `Id`,bus_type.IsEnable ,`Name`, `SeatNumber` FROM `bus_type` '

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
  update: async (req, res) => {
    let data = req.body;
    let Id = req.query.Id;
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
      return;
    }
    const user = await getUser(decoded.data._id)
    if(user.isManager != 1) {
      res.status(401).send("You dont have permission");
      return;
    }
    data.modifiedBy = user.Id
    data.modifiedOn = (new Date()).toISOString();
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  store: async (req, res) => {
    
    let data = req.body;
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
      return;
    }
    const user = await getUser(decoded.data._id)
    if(user.isManager != 1) {
      res.status(401).send("You dont have permission");
      return;
    }
    data.modifiedBy = user.Id
    data.modifiedOn = (new Date()).toISOString();
    if(data.Name.trim() == 0) {
      res.json({error: 'Tên không hợp lệ'})
      return;
    }
    let sql = `INSERT INTO ${table} SET ?`;
    console.log(data)
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let sql = `UPDATE ${table} SET IsEnable = 0 WHERE Id = ?`;
    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Del" });
    });
  },

  undoDelete: (req, res) => {
    let sql = `UPDATE ${table} SET IsEnable = 1 WHERE Id = ?`;
    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Undo" });
    });
  },
};


const getUser = async (Id) => new Promise((resolve, reject) => {
  let sql = `select * from user where Id = ?`;
  db.query(sql, [Id], (err, response) => {
    if (err) throw err;
    resolve(response[0])
  });
})