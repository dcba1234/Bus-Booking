"use strict";
const jwtHelper = require('../helpers/jwt.helper');
const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const _ = require("lodash")
const table = "user";

const getDriver = 'SELECT `Id`,user.IsEnable, `Account`, `Name`, `BirthDay`, `Gender`, `PhoneNumber`, `RouteResgisterId` FROM `user` where isDriver = 1'
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
  getHistory: (req, res) => {
    let sql = `SELECT user_register_history.Id, user_register_history.BusRouteId, user.Name as 'userName', bus_route.Name as 'routeName',user_register_history.UserId, user_register_history.ModifiedOn, user_register_history.ModifiedBy FROM user_register_history, user, bus_route WHERE user_register_history.UserId = user.Id and user_register_history.BusRouteId = bus_route.Id`;
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

const checkIfExistAccount = async (account,Id = 0) => new Promise((resolve, reject) => {
  let sql = `select count(Id) as result from ${table} where Account = ? and Id <> ?`;
  db.query(sql, [account,Id], (err, response) => {
    if (err) throw err;
    resolve(response[0].result)
  });
})

const getUser = async (Id) => new Promise((resolve, reject) => {
  let sql = `select * from user where Id = ?`;
  db.query(sql, [Id], (err, response) => {
    if (err) throw err;
    resolve(response[0])
  });
})