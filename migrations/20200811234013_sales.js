
exports.up = function(knex) {
    return knex.schema.createTable('sales', sale => {
          sale.increments();
  
          sale
            .integer('car_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('cars-dealer')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          sale.string('description', 128).notNullable();
          sale.text('status').notNullable();
          sale.boolean('completed');
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sales");
  };