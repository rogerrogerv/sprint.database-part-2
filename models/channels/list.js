module.exports = (knex, Channel) => {
  return () => {
    return Promise.resolve(knex.select("*").from("channels")) // fix me!
      .then((dirtyChannels) =>
        dirtyChannels.map((channel) => new Channel(channel))
      )
      .catch((error) => console.log(error));
  };
};
