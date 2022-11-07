var connectCounter = 0;

async function multiIoPass(io, oReadData) {
  io.on("connection", async function (socket) {
    console.log(socket.client.conn.server.clientsCount + " users connected");
    connectCounter = socket.client.conn.server.clientsCount;

    socket.broadcast.emit("clientCounter", connectCounter.toString());
    socket.emit("clientCounter", connectCounter.toString());

    socket.on("lstReq", async (data) => {
      socket.emit("lstReq", "testing");
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
