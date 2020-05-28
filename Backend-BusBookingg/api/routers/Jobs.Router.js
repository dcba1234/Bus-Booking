"use strict";
module.exports = function(router) {
  var productsCtrl = require("../controllers/Jobs.Controller");

  // todoList Routes
  router
    .route("/jobs")
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  router
    .route("/jobs/:Id")
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};
