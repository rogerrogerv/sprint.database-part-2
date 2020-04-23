module.exports = (knex, User) => {
  return () => {
    return Promise.resolve(knex.select("*").from("users")) // fix me!
      .then((dirtyUsers) => dirtyUsers.map((user) => new User(user)))
      .catch((error) => console.log(error));
  };
};
