module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(cars) {
  const result = {
    ...cars,
    clean: intToBoolean(cars.clean),
  };

  if (cars.sales) {
    result.sales = cars.sales.map(sale => ({
      ...sale,
      completed: intToBoolean(sale.completed),
    }));
  }

  return result;
}

function actionToBody(sale) {
  return {
    ...sale,
    completed: intToBoolean(sale.completed),
  };
}
