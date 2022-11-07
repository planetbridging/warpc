var connectCounter = 0;

async function multiIoPass(io, oReadData) {
  io.on("connection", async function (socket) {
    console.log(socket.client.conn.server.clientsCount + " users connected");
    connectCounter = socket.client.conn.server.clientsCount;

    socket.broadcast.emit("clientCounter", connectCounter.toString());
    socket.emit("clientCounter", connectCounter.toString());

    socket.on("lstReq", async (data) => {
      let text = oReadData.lstSearchItem1.toString();
      socket.emit("lstReq", text);
    });

    socket.on("lstReqData", async (data) => {
      if (oReadData.lstReqs.has(data)) {
        //console.log(oReadData.lstReqs);
        //console.log(oReadData.lstReqs.get(data));

        if (oReadData.lstReqObjs.has(oReadData.lstReqs.get(data))) {
          var j = {
            title: data,
            subTitle: oReadData.lstReqs.get(data),
            lstParam: oReadData.lstReqObjs.get(oReadData.lstReqs.get(data)),
          };
          var jTxt = JSON.stringify(j);
          socket.emit("lstReqData", jTxt);
          //console.log(oReadData.lstReqObjs.get(oReadData.lstReqs.get(data)));
        }
      }
      /*let text = oReadData.lstSearchItem1.toString();
      socket.emit("lstReq", text);*/
    });

    socket.on("lstReqObjs", async (data) => {
      let text = oReadData.lstSearchItem2.toString();
      socket.emit("lstReqObjs", text);
    });

    socket.on("lstReqObjsData", async (data) => {
      if (oReadData.lstReqObjs.has(data)) {
        //console.log(oReadData.lstReqObjs.get(data));
        var j = oReadData.lstReqObjs.get(data);
        var jTxt = JSON.stringify(j);
        socket.emit("lstReqObjsData", jTxt);
      }
      /*if (oReadData.lstReqs.has(data)) {
        //console.log(oReadData.lstReqs);
        //console.log(oReadData.lstReqs.get(data));

        if (oReadData.lstReqObjs.has(oReadData.lstReqs.get(data))) {
          var j = {
            title: data,
            subTitle: oReadData.lstReqs.get(data),
            lstParam: oReadData.lstReqObjs.get(oReadData.lstReqs.get(data)),
          };
          var jTxt = JSON.stringify(j);
          socket.emit("lstReqObjsData", jTxt);
          //console.log(oReadData.lstReqObjs.get(oReadData.lstReqs.get(data)));
        }
      }*/
    });

    socket.conn.on("close", (reason) => {
      connectCounter = socket.client.conn.server.clientsCount;
      socket.broadcast.emit("clientCounter", connectCounter.toString());
    });
  });

  return io;
}

module.exports = {
  multiIoPass,
};
