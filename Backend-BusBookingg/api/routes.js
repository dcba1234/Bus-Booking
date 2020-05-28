const express = require("express");

function eRoutes() {
  const router = express.Router();
  let employees = require("./routers/Employees.Router")(router);
  let jobs = require("../api/routers/Jobs.Router")(router);
  let department = require("../api/routers/Department.Router")(router);
  return router;
}

module.exports = eRoutes;
