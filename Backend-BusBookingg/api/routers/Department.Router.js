"use strict";
module.exports = function(router) {
  var products = require("../controllers/Department.Controller");

  router
    .route("/department")
    .get(products.get)
    .post(products.store);

  router
    .route("/department/:Id")
    .get(products.detail)
    .put(products.update)
    .delete(products.delete);
};
