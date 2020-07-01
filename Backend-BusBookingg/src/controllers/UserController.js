"use strict";
const jwtHelper = require('../helpers/jwt.helper');
const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const _ = require("lodash")
const table = "user";

const getDriver = 'SELECT `Id`, `Account`, `Name`, `BirthDay`, `Gender`, `PhoneNumber`, `RouteResgisterId` FROM `user` where isDriver = 1'
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret-tienthanh";
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

  authentication: (req, res) => {
    let sql = `select result from ${table} where Account = ? and Id <> ?`;
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

  getUserById: async (req, res) => {
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
    }
    const idUser = await decoded.data._id;
    console.log(idUser);
    
    if (idUser) {
      let sql = 'SELECT Account, Name, BirthDay, Gender, PhoneNumber, RouteResgisterId FROM user where Id = ?';
      db.query(sql, [idUser], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  
  updateDriver: async (req, res) => {
    let data = req.body;
    let Id = req.params.id;
    const rs = await checkIfExistAccount(req.body.Account, Id)
    if(rs != 0){
      res.status(401).send('This account is already exist')
      return
    }
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
  storeDriver: async (req, res) => {
      // just Name , account, birthday,gender, phonenumber
      const rs = await checkIfExistAccount(req.body.Account)
      if(rs != 0){
        res.status(401).send('This account is already exist')
        return
      }
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

const checkIfExistAccount = async (account,Id = 0) => new Promise((resolve, reject) => {
  let sql = `select count(Id) as result from ${table} where Account = ? and Id <> ?`;
  db.query(sql, [account,Id], (err, response) => {
    if (err) throw err;
    resolve(response[0].result)
  });
})

