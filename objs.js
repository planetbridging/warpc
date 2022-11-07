const axios = require("axios");
const oAccess = require("./localAccess");

class objReq {
  constructor(name, type, description, other) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.other = other;
  }
}

class objReadWsld {
  async loadLocalXml(tmpPath) {
    var data = await oAccess.readLargeFile(tmpPath);
    var jData = await oAccess.xmlToJson(data);
    this.readData(jData);
  }

  async webLinkLoad(url) {
    var data = await axios.get(url);
    var jData = await oAccess.xmlToJson(data["data"]);
    this.readData(jData);
  }

  async readData(jData) {
    var lstReqs = new Map();
    var lstReqObjs = new Map();
    var lstSearchItem1 = [];
    var lstSearchItem2 = [];

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
                if (tmpName != subData[subKeys[sk]]) {
                  lstOthers.push([subKeys[sk], subData[subKeys[sk]]]);
                }
              }
            }

            var tmpReqObj = new objReq(tmpName, tmpType, tmpDesc, lstOthers);
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
        if (!lstSearchItem2.includes(reqName)) {
          lstSearchItem2.push(reqName);
        }
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
          if (!lstSearchItem1.includes(reqName)) {
            lstSearchItem1.push(reqName);
          }
        }
      }
    }

    this.lstSearchItem1 = lstSearchItem1;
    this.lstSearchItem2 = lstSearchItem2;
    this.lstReqs = lstReqs;
    this.lstReqObjs = lstReqObjs;
  }
}

module.exports = {
  objReq,
  objReadWsld,
};
