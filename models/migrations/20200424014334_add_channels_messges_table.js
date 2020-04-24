/* eslint-disable no-unused-vars */
exports.up = function(knex, Promise) {
  // create the 'channels' table with two columns
  return knex.schema.createTable("channel_messages", (table) => {
    table
      .increments("id") // auto-incrementing id column
      .unique() // add a unique constraint to this column
      .index(); // index this column

    table
      .integer("channel_id", 15) // maximum length of 15 characters
      .index(); // index it

    table
      .integer("from_id", 15) // maximum length of 15 characters
      .index(); // index it

    table
      .string("message", 250) // maximum length of 250 characters
      .index(); // index it

    table.date("sent_at").defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
