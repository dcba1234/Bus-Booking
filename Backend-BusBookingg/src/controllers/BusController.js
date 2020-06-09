"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");

const table = "bus";

const getAll = 'SELECT bus.Id, `Number`, `TypeId`,DriverId, `DriverId`,user.Account as `driverAccount`,user.Name as `driverName`,user.PhoneNumber as `driverPhoneNumber`,bus_type.Name as `busType` FROM `bus`,`bus_type`,`user` WHERE bus.TypeId = bus_type.Id and bus.DriverId = user.Id'

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
  update: async (req, res) => {
    
    let data = req.body;
    let Id = req.params.number;
    const rs = await checkIfExistNumber(req.body.Number, Id)
    if(rs != 0){
      res.status(401).send('This number is already exist')
      return
    }
    console.log(req.params.Id)
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    db.query(sql, [data, Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thành công !" });
    });
  },
  store: async (req, res) => {
    let data = req.body;
    const rs = await checkIfExistNumber(req.body.Number)
    if(rs != 0){
      res.status(401).send('This number is already exist')
      return
    }
    let sql = `INSERT INTO ${table} SET ?`;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${table} WHERE Id = ?`;
 
    db.query(sql, [req.params.Id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Đã xóa thành công!" });
    });
  }
};



const checkIfExistNumber = async (number,Id = 0) => new Promise((resolve, reject) => {
  let sql = `select count(Id) as result from ${table} where Number = ? and Id <> ?`;
  db.query(sql, [number,Id], (err, response) => {
    if (err) throw err;
    resolve(response[0].result)
  });
})