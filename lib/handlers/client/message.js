const idToPreferred = require("../../utility/idToPrefered");
const replaceWithUser = require("../../utility/mentionConversion");
var colors = require('@colors/colors');

module.exports = function (client, groupChatChannelId, io, message) {
  return function (message) {
    
    if (message.channel.id === groupChatChannelId) {
      if (message.content.includes(".nbr")) {
        console.log(`[${colors.blue.bold("Discord")} ${colors.green("->")} ${colors.yellow.bold("swS")}] ${colors.red.bold.underline("Message rejected")} ${idToPreferred(message.author.id)}: ${replaceWithUser(message.content, client)}`);
        io.emit("recieve", `<b class='author'>${idToPreferred(message.author.id)} </b> <b class='nobridge'> [nobr] </b>`);
        return;
      }

      io.emit("recieve", `<b class='author'>${idToPreferred(message.author.id)} </b> ${replaceWithUser(message.content, client)}`);
      console.log(`
      [${colors.blue.bold("Discord")} ${colors.green("->")} ${colors.yellow.bold("swS")}] ${idToPreferred(message.author.id)}: ${replaceWithUser(message.content, client)}`);
    }
  };
};
