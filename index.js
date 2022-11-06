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
  var lstReqObjs = new Map();

  var reqInputs = jData["definitions"]["types"][0]["xsd:schema"][0];

  //console.log(Object.keys(reqInputs));
  //console.log(reqInputs["xsd:complexType"]);
  var reqTypes = reqInputs["xsd:complexType"];

  for (var rt in reqTypes) {
    //console.log("---" + rt + "---");
    var d = reqTypes[rt];
    //console.log(d);
    var lstObjs = [];
    var reqName = "";
    var found = false;
    if (Object.keys(d).includes("xsd:all")) {
      var lstElements = d["xsd:all"][0]["xsd:element"];
      for (var e in lstElements) {
        if (Object.keys(lstElements[e]).includes("ATTR")) {
          var subData = lstElements[e]["ATTR"];
          var subKeys = Object.keys(subData);
          var tmpName = "";
          var tmpType = "";
          var tmpDesc = "";
          var lstOthers = [];
          for (var sk in subKeys) {
            if (subKeys[sk] == "name") {
              tmpName = subData["name"];
            } else if (subKeys[sk] == "type") {
              tmpType = subData["type"];
            } else if (subKeys[sk] == "description") {
              tmpDesc = subData["description"];
            } else {
              lstOthers.push([subKeys[sk], subData[subKeys[sk]]]);
            }
          }

          var tmpReqObj = new oBjs.objReq(tmpName, tmpType, tmpDesc, lstOthers);
          lstObjs.push(tmpReqObj);
        }
      }
    }

    if (Object.keys(d["ATTR"]).includes("name")) {
      reqName = d["ATTR"]["name"];
      found = true;
    }

    if (found && lstObjs.length > 0) {
      lstReqObjs.set(reqName, lstObjs);
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
