const http = require("http");
const https = require("https");
var express = require("express");
var fs = require("fs");
var cors = require("cors");
var app = express(),
  server = require("http").createServer(app);

const oWebSocks = require("./webSockets");
const oBjs = require("./objs");

async function startWeb() {
  console.log("starting web hosting");
  startHosting();
}

async function startHosting() {
  console.log("running in testing");
  var tmpPath = "C:\\git\\example.xml";
  var tmpWebPath = "https://api.astutepayroll.com/webservice/?wsdl";

  var oReadData = new oBjs.objReadWsld();
  oReadData.loadLocalXml(tmpPath);

  var server_http = http.createServer(app);
  //multiIoPass(server_https);
  //ioGet.attach(server_https);
  server_http.listen(5000, function () {
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
