
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
  //     // Inserts seed entries
      return knex('sales').insert([
        {car_id: 1, description: 'The New car', status: "Available", completed: false},
        {car_id: 2, description: 'The New car', status: "Available", completed: false},
        {car_id: 3, description: 'The New car', status: "Available", completed: false},
      ]);
    });
};