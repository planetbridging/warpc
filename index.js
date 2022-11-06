const axios = require("axios");

const oAccess = require("./localAccess");
const oBjs = require("./objs");

var tmpPath = "C:\\git\\example.xml";

(async () => {
  console.log("welcome to warpc");
  testing();
})();

async function testing() {
  var data = await oAccess.readLargeFile(tmpPath);
  var jData = await oAccess.xmlToJson(data);
  var lstReqs = new Map();

  var reqInputs = jData["definitions"]["types"][0]["xsd:schema"][0];

  //console.log(Object.keys(reqInputs));
  //console.log(reqInputs["xsd:complexType"]);
  var reqTypes = reqInputs["xsd:complexType"];

  for (var rt in reqTypes) {
    //console.log("---" + rt + "---");
    var d = reqTypes[rt];
    //console.log(d);
    if (Object.keys(d).includes("xsd:all")) {
      console.log(d["xsd:all"][0]["xsd:element"]);
    }

    if (Object.keys(d["ATTR"]).includes("name")) {
      var reqName = d["ATTR"]["name"];
      //console.log(reqName);
    }
  }

  var lst = jData["definitions"]["message"];
  for (var k in lst) {
    var item = lst[k]["part"][0]["ATTR"];
    var keys2 = Object.keys(item);
    if (keys2.includes("name")) {
      if (item["name"] == "parms_in") {
        var reqName = lst[k]["ATTR"]["name"];
        var reqKey = item["type"].split("tns:")[1];
        lstReqs.set(reqName, reqKey);
      }
    }
  }
}
