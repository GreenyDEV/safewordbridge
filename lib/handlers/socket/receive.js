var colors = require('@colors/colors');

module.exports = function (socket) {
    return function (message) {
      socket.emit("recieve", message);
      console.log(`[${colors.yellow.bold("swS")} -> ${colors.brightYellow.bold("swW")}] ${message}`);
    };
  };
  