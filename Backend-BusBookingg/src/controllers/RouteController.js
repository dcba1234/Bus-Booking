"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const jwtHelper = require("../helpers/jwt.helper");
const table = "bus_route";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret-tienthanh";
const getAll =
  `SELECT bus_route.Id, bus_route.Name, BusId,bus.Number as 'busNumber',bus_type.SeatNumber as 'maxSeat', bus_type.Name as 'busType',user.Account as 'driverAccount', 
  user.Name as 'driverName' ,FirstLocateId,IsEnable ,L1.Name as FirstLocateName,L1.Locate as FirstLocate,L2.Name as EndLocateName, EndLocateId, 
  ParkingFee, ParkingLot, DepartureTime, ArriveTime, IsShuffer, IsEnable, SeatCount FROM (bus_route,bus,bus_type,user)
  INNER JOIN bus_locate L1 ON bus_route.FirstLocateId = L1.Id 
   INNER JOIN bus_locate L2 ON bus_route.EndLocateId = L2.Id 
 WHERE bus_route.BusId = bus.Id and bus.TypeId = bus_type.Id and bus.DriverId = user.Id`;

 const getByRouteId = `SELECT bus_route.Id, bus_route.Name, BusId,bus.Number as 'busNumber',bus_type.SeatNumber as 'maxSeat', bus_type.Name as 'busType',user.Account as 'driverAccount', 
          user.Name as 'driverName' ,FirstLocateId,IsEnable ,L1.Name as FirstLocateName,L1.Locate as FirstLocate,L2.Name as EndLocateName, EndLocateId, 
          ParkingFee, ParkingLot, DepartureTime, ArriveTime, IsShuffer, IsEnable, SeatCount FROM (bus_route,bus,bus_type,user)
          INNER JOIN bus_locate L1 ON bus_route.FirstLocateId = L1.Id 
            INNER JOIN bus_locate L2 ON bus_route.EndLocateId = L2.Id 
          WHERE bus_route.BusId = bus.Id and bus.TypeId = bus_type.Id and bus.DriverId = user.Id and bus_route.Id = ?`;
module.exports = {
  get: (req, res) => {
    let sql = getAll;
    if (req.query.name) {
      sql = getAll;
    }
    db.query(sql, [req.query.name], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getActive: (req, res) => {
    let sql = getAll + ' and bus_route.isEnable = 1';
    if (req.query.name) {
      sql = getAll;
    }
    db.query(sql, [req.query.name], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getByName: (req, res) => {
    if (req.params.number) {
      let sql = getAll + " and bus_route.Name = ?";
      db.query(sql, [req.query.name], (err, response) => {
        if (err) throw err;
        //if(!!!response[0]) res.json([])
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  getById: async (req, res) => {
    if(!req.headers.authtoken){
      res.status(401).send("You need to authen");
      return;
    } 
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
    }
    const user = await getUser(decoded.data._id)

    if (user) {
      let sql = getByRouteId;
      db.query(sql, [user.RouteResgisterId], (err, response) => {
        if (err) throw err;
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
