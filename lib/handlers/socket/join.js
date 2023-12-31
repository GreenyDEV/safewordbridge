module.exports = function (socket, rooms, usernames) {
    return async function (room, username) {
      if (username !== "") {
        rooms[socket.id] = room;
        usernames[socket.id] = username;
        socket.leaveAll();
        socket.join(room);
        socket.emit("join", room);
      }
    };
  };
  