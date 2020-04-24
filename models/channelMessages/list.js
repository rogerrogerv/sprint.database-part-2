module.exports = (knex, ChannelMessage) => {
  return () => {
    return Promise.resolve(knex.select("*").from("channel_messages")) // fix me!
      .then((dirtyChannelMessages) =>
        dirtyChannelMessages.map(
          (channelMessage) => new ChannelMessage(channelMessage)
        )
      )
      .catch((error) => console.log(error));
  };
};
