/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/routes/api.js
 */
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const BusController = require("../controllers/BusController");
const BusTypeController = require("../controllers/BusTypeController");
const UserController = require("../controllers/UserController");
const LocateController = require("../controllers/LocationController");
const RouteController = require("../controllers/RouteController");
const RequestController = require("../controllers/RequestController");
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  router.get("/bus", BusController.get)
  router.post("/bus", BusController.store)
  router.put("/bus/:number", BusController.update)
  router.get("/bus/:number", BusController.getBusByNumber)
  router.delete("/bus/deactive/:id", BusController.delete)
  router.delete("/bus/active/:id", BusController.undoDelete)

  router.get("/bus-type", BusTypeController.get)
  router.post("/bus-type", BusTypeController.store)
  router.put("/bus-type", BusTypeController.update)
  router.delete("/bus-type/deactive/:id", BusTypeController.delete)
  router.delete("/bus-type/active/:id", BusTypeController.undoDelete)

  //driver
  router.get("/driver", UserController.getDriver)
  router.post("/driver", UserController.storeDriver)
  router.put("/driver/:id", UserController.updateDriver)
  router.delete("/driver/deactive/:id", UserController.delete)
  router.delete("/driver/active/:id", UserController.undoDelete)

  //locate
  router.get("/locate", LocateController.get)
  router.put("/locate/:id", LocateController.update)
  router.post("/locate", LocateController.store)
  router.delete("/locate/deactive/:id", LocateController.delete)
  router.delete("/locate/active/:id", LocateController.undoDelete)
  // end region

   //router
   router.get("/route", RouteController.get)
   router.get("/route/active", RouteController.getActive)
   router.get("/route/myroute", RouteController.getMyRoute)
   router.get("/route/:id", RouteController.getRouteById)
   router.put("/route/:id", RouteController.update)
   router.post("/route", RouteController.store)
   router.delete("/route/deactive/:id", RouteController.delete)
   router.delete("/route/active/:id", RouteController.undoDelete)
   // end region

  //request
  router.get("/request", RequestController.get)
  router.put("/request/accept/:id", RequestController.accept)
  router.put("/request/reject/:id", RequestController.reject)
  router.post("/request", RequestController.store)

  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);
  router.get("/friends", FriendController.friendLists);
  router.use(AuthMiddleWare.isAuth);

  //user
  router.get('/user', UserController.getUserById)
  router.get('/history', UserController.getHistory)

  return app.use("/", router);
}

module.exports = initAPIs;