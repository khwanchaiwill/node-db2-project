
exports.up = function(knex) {
    return knex.schema.createTable('cars-dealer',tbl => {
        tbl.increments();
  
        tbl.string("VIN", 17)
          .notNullable()
          .unique();
  
        tbl.string("make", 128)
          .notNullable();
  
        tbl.string("model", 128)
          .notNullable();
  
        tbl.integer("mileage")
          .notNullable();
  
        tbl.string("transType", 256)
  
        tbl.boolean("clean");
         
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars-dealer')
  };;
