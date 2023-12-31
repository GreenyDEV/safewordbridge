module.exports = function (socket, client, groupChatChannelId) {
    return async function (isTyping) {
      const channel = await client.channels.fetch(groupChatChannelId);
      if (isTyping) {
        channel.startTyping();
       
      } else {
        channel.stopTyping();
       
      }
    };
  };
  