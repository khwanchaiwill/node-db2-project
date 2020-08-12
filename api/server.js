const express = require('express')
const carsRouter = require('../CarsRouter/carRouter.js')
const carStatusRouter = require('../CarsRouter/carStatusRouter')

const server = express();

server.use(express.json());

server.use(logger)

server.use('/api/cars-dealer', carsRouter)
server.use('/api/status', carStatusRouter)

server.get('/', (req, res) => {
    res.send('The network working')
});

function logger(req, res, next){
    console.log(`${req.method} request the ${req.url}`, Date())
    next();
}
module.exports = server;