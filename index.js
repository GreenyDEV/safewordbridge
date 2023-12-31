const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Discord = require("discord.js-selfbot");
const path = require("path");
var colors = require('@colors/colors');
const httpPort = 3000;

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

const client = new Discord.Client();
const token = ""; 

const directory = path.join(__dirname, "public");

app.use(express.static(directory));

const rooms = {};
const usernames = {};
const groupChatChannelId = "1078485480439550023"; // Replace with your group chat channel ID
const userPreferences = require('./config/preferedNames')
const tagToPreferred = require('./lib/utility/tagToPrefered')
const iDToPreferred = require('./lib/utility/idToPrefered')
const replaceWithUser = require('./lib/utility/mentionConversion')



 client.on("ready", async () => {
    console.log(colors.bgGreen.black("[ ✔ ]") + `${colors.green(" Safebridge successfully Logged in as")} ${colors.bgBrightYellow.black.bold(client.user.tag)}`);
    console.log(colors.bgGreen.black("[ ✔ ] READY"))

    client.user.setPresence({
        status: 'dnd', // You can use 'online', 'idle', 'dnd' (do not disturb), or 'invisible'
        activity: {
          name: 'SafeWord Bridge',
          type: 'PLAYING', // You can use 'PLAYING', 'LISTENING', 'WATCHING', 'STREAMING'
        },
      });
  });
  
io.on("connection", function (socket) {
  socket.on("send", require('./lib/handlers/socket/send')(socket, client, groupChatChannelId));
  socket.on("recieve", require('./lib/handlers/socket/receive')(socket));
  socket.on("typing", require('./lib/handlers/socket/typing')(socket, client, groupChatChannelId));
}); 

client.on("message", require("./lib/handlers/client/message")(client, groupChatChannelId, io));
client.login(token);


httpServer.listen(httpPort, () => {
    console.log(colors.bgGreen.black("[ ✔ ]") + colors.bold.green(" HTTP Server mounted on port ") + colors.brightGreen.underline(httpPort))

});