exports.up = function (knex) {
    return knex.schema.createTable("companies", (tbl) => {
      tbl.increments("company_id");
      tbl.string("name", 128).notNullable();
      tbl.boolean("technology").defaultTo(0);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("companies");
  };