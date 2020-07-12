"use strict";
const jwtHelper = require("../helpers/jwt.helper");
const util = require("util");
const mysql = require("mysql");
const db = require("../helpers/db");

const table = "request";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret-tienthanh";
const getAll =
  `SELECT request.Id, RequesterId,bus_route.Name,user.Name as 'requesterName', user.Account, RequestDate, StartDate, ExpireDate, Status, routeId FROM request, bus_route, user WHERE bus_route.Id = routeId and user.Id = request.RequesterId`;
const getMine =
  'SELECT request.Id, RequesterId,bus_route.Name, RequestDate, StartDate, ExpireDate, Status, routeId FROM request, bus_route WHERE bus_route.Id = routeId';
module.exports = {
  get: async (req, res) => {
    let sql = getAll;
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
    }
    const user = await getUser(decoded.data._id)
    if(!user.isManager) {
      sql += ' and RequesterId = ' + user.Id
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
  getById: (req, res) => {
    if (req.params.id) {
      let sql = getAll + " and bus_route.Id = ?";
      db.query(sql, [req.params.id], (err, response) => {
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
    data.Status = 'pending'
    const decoded = await jwtHelper.verifyToken(
      req.headers.authtoken,
      refreshTokenSecret
    );
    if(!decoded){
      res.status(401).send("You need to authen");
      return;
    }
    const user = await getUser(decoded.data._id)
    data.modifiedBy = user.Id
    data.modifiedOn = (new Date()).toISOString();

    data.RequesterId = decoded.data._id
    data.RequestDate = (new Date()).toISOString();
    let sql = `INSERT INTO ${table} SET ?`;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Thêm thành công!" });
    });
  },

  accept: async (req, res) => {
    let sql = `UPDATE ${table} SET ? WHERE Id = ?`; //test
    let data = { Status: `applied`}
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

    const currentRequest = await getRequestById(req.params.id);
    if(!currentRequest) {
      throw err;
    }
    const currentEmployee = await getEmployeeCountByRoute(currentRequest.routeId);
    const maxSeat = await getMaxSeat(currentRequest.routeId);
    console.log('đang có:',currentEmployee[`count(*)`]);
    console.log('và max đang là:',maxSeat.SeatNumber);
    if(maxSeat.SeatNumber < currentEmployee[`count(*)`]) {
      res.status(400).send("This route is full of people, max is "+ maxSeat.SeatNumber);
      return;
    }
    db.query(sql, [data ,req.params.id], (err, response) => {
      if (err) throw err;
    });

    
    let sql2 = `UPDATE user SET RouteResgisterId = ? WHERE Id = ?`;
    db.query(sql2, [maxSeat.Id,currentRequest.RequesterId], (err, response) => {
      if (err) throw err;
      storeHistory({ BusRouteId: maxSeat.Id, UserId: currentRequest.RequesterId, modifiedBy: data.modifiedBy, modifiedOn: data.modifiedOn})
      res.json({ message: "Ok" });
    });
  },

  reject: (req, res) => {
    let sql = `UPDATE ${table} SET Status = 'rejected' WHERE Id = ?`;

    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Ok" });
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

const getEmployeeCountByRoute = async (Id) => new Promise((resolve, reject) => {
  let sql = `select count(*) from user where RouteResgisterId = ?`;
  db.query(sql, [Id], (err, response) => {
    if (err) throw err;
    resolve(response[0])
  });
})

const getMaxSeat = async (Id) => new Promise((resolve, reject) => {
  let sql = `SELECT bus_route.Id,bus_type.SeatNumber FROM bus_route, bus, bus_type where bus_route.BusId = bus.Id and bus.TypeId = bus_type.Id and bus_route.Id = ?`;
  db.query(sql, [Id], (err, response) => {
    if (err) throw err;
    resolve(response[0])
  });
})


const getRequestById = async (Id) => new Promise((resolve, reject) => {
  let sql = `select * from ${table} where Id = ?`;
  db.query(sql, [Id], (err, response) => {
    if (err) throw err;
    resolve(response[0])
  });
})


const storeHistory = async (data) => {
  let sql = `INSERT INTO user_register_history SET ?`;
  db.query(sql, [data], (err, response) => {
    if (err) throw err;
  });
}