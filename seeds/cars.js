
exports.seed = function(knex) {
 
  return knex('cars-dealer').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars-dealer').insert([
        {id: 1, VIN: 'VTJDAJDFALJFLA1', make: "Honda", model: "CR-V", mileage: 10000, transtype: "New", clean: true},
        {id: 2, VIN: 'VTJDAJDFALJFLA2', make: "Toyota", model: "Rav4", mileage: 10000, transtype: "New", clean: true},
        {id: 3, VIN: 'VTJDAJDFALJFLA3', make: "Nissan", model: "GT-R", mileage: 0, transtype: "New", clean: true},
      ]);
     clean: true});
};
