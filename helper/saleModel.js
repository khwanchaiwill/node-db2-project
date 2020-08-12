const db = require('../data/dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db('sales');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((sale) => {
        if (sale) {
          return mappers.saleToBody(sale);
        } else {
          return null;
        }
      });
  } else {
    return query.then((sales) => {
      return sales.map((sale) => mappers.saleToBody(sale));
    });
  }
}

function insert(sale) {
  return db('sales')
    .insert(sale, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('sales')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('sales').where('id', id).del();
}
