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

    socket.on("lstReqObjs", async (data) => {
      let text = oReadData.lstSearchItem2.toString();
      socket.emit("lstReqObjs", text);
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
