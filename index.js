const axios = require("axios");

const oAccess = require("./localAccess");

var tmpPath = "C:\\git\\example.xml";

(async () => {
  console.log("welcome to warpc");
  testing();
})();

async function testing() {
  var data = await oAccess.readLargeFile(tmpPath);
  var jData = await oAccess.xmlToJson(data);

  //console.log(jData["definitions"]["types"][0]["xsd:schema"][0]);
  var lst = jData["definitions"]["message"];
  for (var k in lst) {
    var keys = Object.keys(lst[k]);
    var item = lst[k]["part"][0]["ATTR"];
    var keys2 = Object.keys(item);
    console.log(keys2);
    if (keys2.includes("name")) {
      if (item["name"] == "parms_in") {
        var t = item["type"].split("tns:")[1];
        console.log(t);
      }
    }
  }
}
