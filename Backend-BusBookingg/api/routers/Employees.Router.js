"use strict";
module.exports = function(router) {
  var productsCtrl = require("../controllers/Employees.Controller");

  // todoList Routes
  router
    .route("/employees")
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  router
    .route("/employees/:Id")
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};
