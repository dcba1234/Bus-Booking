const express = require("express");
const initAPIs = require("./src/routes/api");
var cors = require('cors')
const app = express();
app.use(cors())
const bodyParser = require("body-parser");
require("dotenv").load();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// let router = require("./api/routes")();
// app.use("/api", router);
initAPIs(app);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
app.listen(port);

console.log("RESTful API server started on: " + port);

// const app = express();
// const bodyParser = require("body-parser");
// // 2 cái dư
// app.use(bodyParser.json()); 
// app.use(express.json());

// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It workdsfsdfsdfs!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();