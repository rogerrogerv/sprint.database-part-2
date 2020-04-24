//module.exports = (knex, channelMessage) => (params) => Promise.resolve({});

const validateChannelMessage = (messageName) =>
  typeof messageName === "string" && messageName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    const chMessage = params.message;
    const fromUser = params.fromUser;
    const toChannel = params.toChannel;
    console.log("chMessage --->", chMessage);
    console.log("fromUser ----->", fromUser);
    console.log("toChannel------>", toChannel);
    console.log("params ---->", params);

    // if (!validateChannelMessage(chMessage)) {
    //   return Promise.reject(
    //     new Error("Channel name must be provided, and be at least 3 characters")
    //   );
    // }

    /*
        id: this.id,
        fromUser: this.fromUser,
        toChannel: this.toChannel,
        message: this.message,
    
        */

    return knex("channel_messages")
      .insert([
        { channel_id: toChannel },
        { from_id: fromUser },
        { message: chMessage },
      ])
      .then(() => {
        return knex("channel_messages")
          .where([
            { channel_id: toChannel },
            { from_id: fromUser },
            { message: chMessage },
          ])
          .join("channel_messages", "channel_messages.from_id", "users.id") // ??????
          .select("from_id", "u.id");
        consolg.log(toChannel, fromUser, chMessage, from_id, u.id, "-----"); /// ?????
        // .select();
      })
      .then((channels) => new ChannelMessage(channels.pop()))
      .catch((error) => {
        if (
          error.message.match("duplicate key value") ||
          error.message.match("Unique constraint failed")
        )
          return Promise.reject(new Error("That channel already exists"));
        return Promise.reject(error);
      });
  };
};
