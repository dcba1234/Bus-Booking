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
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  router.get("/bus", BusController.get)
  router.get("/bus/:number", BusController.getBusByNumber)

  router.get("/bus-type", BusTypeController.get)
  router.post("/bus-type", BusTypeController.store)
  router.put("/bus-type", BusTypeController.update)
  router.delete("/bus-type", BusTypeController.delete)

  //driver
  router.get("/driver", UserController.getDriver)
  router.post("/driver", UserController.storeDriver)
  router.put("/driver/:id", UserController.updateDriver)
  router.delete("/driver/:id", UserController.delete)

  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);
  router.get("/friends", FriendController.friendLists);
  router.use(AuthMiddleWare.isAuth);



  return app.use("/", router);
}

module.exports = initAPIs;