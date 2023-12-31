const { httpPort, frontend, groupDM_ID, token, disc_status, disc_activity, disc_activity_status } = require('./config');

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Discord = require("discord.js-selfbot");
const path = require("path");
var colors = require('@colors/colors');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

const client = new Discord.Client();

const directory = path.join(__dirname, `${frontend}`);
app.use(express.static(directory));

const rooms = {};
const usernames = {};
const userPreferences = require('./config')
const tagToPreferred = require('./lib/utility/tagToPrefered')
const iDToPreferred = require('./lib/utility/idToPrefered')
const replaceWithUser = require('./lib/utility/mentionConversion')

 client.on("ready", async () => {
    console.log(colors.bgGreen.black("[ ✔ ]") + `${colors.green(" Safebridge successfully Logged in as")} ${colors.bgBrightYellow.black.bold(client.user.tag)}`);
    console.log(colors.bgGreen.black("[ ✔ ] READY"))

    client.user.setPresence({
        status: `${disc_status}`,
        activity: {
          name: `${disc_activity}`,
          type: `${disc_activity_status}`,
        },
      });
  });
  
io.on("connection", function (socket) {
  socket.on("send", require('./lib/handlers/socket/send')(socket, client, groupDM_ID));
  socket.on("recieve", require('./lib/handlers/socket/receive')(socket));
  socket.on("typing", require('./lib/handlers/socket/typing')(socket, client, groupDM_ID));
}); 

client.on("message", require("./lib/handlers/client/message")(client, groupDM_ID, io));
client.login(token);


httpServer.listen(`${httpPort}`, () => {
    console.log(colors.bgGreen.black("[ ✔ ]") + colors.bold.green(" HTTP Server mounted on port ") + colors.brightGreen.underline(httpPort))

});
