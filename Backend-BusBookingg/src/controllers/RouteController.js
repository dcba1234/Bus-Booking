"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");
const jwtHelper = require("../helpers/jwt.helper");
const table = "bus_route";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret-tienthanh";
const getAll =
  `SELECT bus_route.Id, bus_route.IsEnable,bus_route.Name, BusId,bus.Number as 'busNumber',bus_type.SeatNumber as 'maxSeat', bus_type.Name as 'busType',user.Account as 'driverAccount', 
  user.Name as 'driverName' ,FirstLocateId ,L1.Name as FirstLocateName,L1.Locate as FirstLocate,L2.Name as EndLocateName, EndLocateId, 
  ParkingFee, ParkingLot, DepartureTime, ArriveTime, IsShuffer, SeatCount FROM (bus_route,bus,bus_type,user)
  INNER JOIN bus_locate L1 ON bus_route.FirstLocateId = L1.Id 
   INNER JOIN bus_locate L2 ON bus_route.EndLocateId = L2.Id 
 WHERE bus_route.BusId = bus.Id and bus.TypeId = bus_type.Id and bus.DriverId = user.Id`;

 const getByRouteId = `SELECT bus_route.Id, bus_route.Name, BusId,bus.Number as 'busNumber',bus_type.SeatNumber as 'maxSeat', bus_type.Name as 'busType',user.Account as 'driverAccount', 
          user.Name as 'driverName' ,FirstLocateId,bus_route.IsEnable ,L1.Name as FirstLocateName,L1.Locate as FirstLocate,L2.Name as EndLocateName, EndLocateId, L2.Locate as EndLocate,
          ParkingFee, ParkingLot, DepartureTime, ArriveTime, IsShuffer, SeatCount FROM (bus_route,bus,bus_type,user)
          INNER JOIN bus_locate L1 ON bus_route.FirstLocateId = L1.Id 
            INNER JOIN bus_locate L2 ON bus_route.EndLocateId = L2.Id 
          WHERE bus_route.BusId = bus.Id and bus.TypeId = bus_type.Id and bus.DriverId = user.Id and bus_route.Id = ?`;
module.exports = {
  get: async (req, res) => {
    let sql = getAll;
    if (req.query.name) {
      sql = getAll;
    }
    db.query(sql, [req.query.name], async (err, response) => {
      if (err) throw err;
      await Promise.all(response.map( async (element) => {
        element.locates = await getLocates(element.Id)
      
      }));
      res.json(response);
    })
  },
  getActive: (req, res) => {
    let sql = getAll + ' and bus_route.IsEnable = 1';
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
  getMyRoute: async (req, res) => {
    console.log("my royte");
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
      db.query(sql, [user.RouteResgisterId],async (err, response) => {
        if (err) throw err;
        response[0].locates = await getLocates(user.RouteResgisterId)
        res.json(response[0]);
      });
    } else res.json("không có dữ liệu");
  },
  getRouteById: async (req, res) => {
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
  
      let sql = getByRouteId;
      db.query(sql, [req.params.id], (err, response) => {
        if (err) throw err;
        res.json(response[0]);
      });
    
  },
  update: async (req, res) => {
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
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;
    storeHistory({...data, ItemId: Id},'update')
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
    data.Id = undefined;
    data.modifiedOn = (new Date()).toISOString();
    storeHistory({...data, ItemId: 0},'create')
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


const storeHistory = async (data, action) => {
  let sql = `INSERT INTO ${table}_history SET ?`;
  data.Id = undefined;
  data.action = action;
  db.query(sql, [data], (err, response) => {
    if (err) throw err;
  });
}

const getLocates = async (routeId) => new Promise((resolve, reject) => {
  let sql = `SELECT route_locate.Id, route_locate.locateId,route_locate.ArriveTime, route_locate.modifiedOn, bus_locate.Name as 'Name',bus_locate.Locate,route_locate.modifiedBy, 
            route_locate.routeId FROM route_locate, bus_locate WHERE bus_locate.Id = route_locate.locateId and route_locate.routeId = ?`;
   db.query(sql, [routeId], (err, response) => {
    if (err) throw err;
    resolve(response || [])
  });

})