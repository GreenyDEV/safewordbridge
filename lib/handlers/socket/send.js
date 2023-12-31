var colors = require('@colors/colors');

module.exports = function (socket, client, groupChatChannelId) {
    return async function (message) {
      const channel = await client.channels.fetch(groupChatChannelId);
      channel.send(`[chloe] ${message}`);
      console.log(`[${colors.bold.brightYellow("swW")} -> ${colors.yellow.bold("swS")}] ${message}`);
      channel.stopTyping();
    };
  };
  