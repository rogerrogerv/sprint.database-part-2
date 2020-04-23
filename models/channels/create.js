const validateChannelName = (chanName) =>
  typeof chanName === "string" && chanName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    const channelName = params.name;

    if (!validateChannelName(channelName)) {
      return Promise.reject(
        new Error("Channel name must be provided, and be at least 3 characters")
      );
    }

    return knex("channels")
      .insert({ name: channelName.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ name: channelName.toLowerCase() })
          .select();
      })
      .then((channels) => new Channel(channels.pop()))
      .catch((error) => {
        if (
          error.message.match("duplicate key value") ||
          error.message.match("Unique constraint failed")
        )
          return Promise.reject(new Error("That channel name already exists"));
        return Promise.reject(error);
      });
  };
};
