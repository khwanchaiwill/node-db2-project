const db = require('../data/dbConfig');
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
  getCarSale,
};

function get(id) {
  let query = db("cars-dealer as cars");

  if (id) {
    query.where("cars.id", id).first();

    const promises = [query, getCarSale(id)]; // [ cars, actions ]

    return Promise.all(promises).then(function(results) {
      let [cars, sales] = results;

      if (cars) {
        cars.sales = sales;

        return mappers.projectToBody(cars);
      } else {
        return null;
      }
    });
  } else {
    return query.then(cars => {
      return cars.map(car=> mappers.projectToBody(car));
    });
  }
}

function insert(car) {
  return db("cars")
    .insert(car, "id")
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("cars")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("cars")
    .where("id", id)
    .del();
}

function getCarSale(carId) {
  return db("sales")
    .where("car_id", carId)
    .then(sales => sales.map(sale=> mappers.actionToBody(sale)));
}
