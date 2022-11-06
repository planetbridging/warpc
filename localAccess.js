const fs = require("fs");
var readline = require("readline");
const events = require("events");
const xml2js = require("xml2js");
const parser2 = new xml2js.Parser({ attrkey: "ATTR" });

async function readLargeFile(p) {
  var data = "";
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(p),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      //console.log(`Line from file: ${line}`);
      data += line;
    });

    await events.once(rl, "close");
    console.log("done");
    //console.log(data);
    console.log("Reading file line by line with readline done.");
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
  return "";
}

async function xmlToJson(data) {
  return await parser2.parseStringPromise(data, function (error, result) {
    if (error === null) {
      //console.log(result);
      return result;
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  readLargeFile,
  xmlToJson,
};
