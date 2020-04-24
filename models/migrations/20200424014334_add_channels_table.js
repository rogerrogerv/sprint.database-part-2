/* eslint-disable no-unused-vars */
exports.up = function(knex, Promise) {
  // create the 'channels' table with two columns
  return knex.schema.createTable("channels", (table) => {
    table
      //.integer("id") //auto created?? assigning nothing as parameter
      .increments("id") // auto-incrementing id column
      .unique() // add a unique constraint to this column
      .index(); // index this column

    table
      .string("name", 15) // maximum length of 15 characters
      //.notNullable() // add a not-null constraint to this column
      .index(); // index it

    table
      .date("created_at")
      //.notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channels");
};
