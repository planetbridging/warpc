const http = require("http");
const https = require("https");
var express = require("express");
var fs = require("fs");
var cors = require("cors");
var app = express(),
  server = require("http").createServer(app);

const oWebSocks = require("./webSockets");
const oBjs = require("./objs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authtoken"
  );
  next();
});

/*app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
  next();
});*/

app.use("/", express.static(__dirname + "/front/build/"));

async function startWeb() {
  console.log("starting web hosting");
  startHosting();
}

async function startHosting() {
  console.log("running in testing");
  var tmpPath = "C:\\git\\example.xml";
  var tmpWebPath = "https://api.astutepayroll.com/webservice/?wsdl";

  var oReadData = new oBjs.objReadWsld();
  //oReadData.loadLocalXml(tmpPath);
  oReadData.webLinkLoad(tmpWebPath);

  var server_http = http.createServer(app);
  //multiIoPass(server_https);
  //ioGet.attach(server_https);
  server_http.listen(5000, "0.0.0.0", function () {
    console.log("server running at 5000");
  });

  const ioImport = require("socket.io")(server_http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  oWebSocks.multiIoPass(ioImport, oReadData);
}

module.exports = {
  startWeb,
};
