const express = require('express');

const db = require('../data/dbConfig');
const CarDB = require('../helper/carsModel');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('cars-dealer')
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Processing error"})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.select('*')
        .from('cars-dealer')
        .where({id})
        .then(cars => {
            if(cars){
                res.status(200).json(cars)
            }else{
                res.status(400).json({message: "Invalid Id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Processing fail"})
        })
})
router.get('/:id/sale', validateCarId, (req, res) => {
  
    CarDB.getCarSale(req.car.id)
      .then(carData => {
        res.status(200).json(carData)
      })
      .catch(err => {
        console.log(err)
        res.status(500)
        .json({
          message: "Error while you are in process can not get user's post"
        })
      })
  });

router.post('/', (req, res) => {
    const cars = req.body
    db("cars-dealer")
    .insert(cars)
    .returning('"id')
    .then(ids => {
        if(ids){
            res.status(201).json(cars);
        }else if(!cars.make){
            res.status(404).json({message: "Need car's make field"})        
        }else if(!cars.model){
            res.status(404).json({message: "Need car's model field"})   
        }else if(!cars.VIN){
            res.status(404).json({message: "Need car's VIN field have to be unique "})   
        }else{
            res.status(400).json({message: "can not make a post request"})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: " Processing Fail"})
    });        
});
router.put('/:id', (req, res) => {
    const carsId = req.params.id;
    const car = req.body;
    db('cars-dealer')
        .where({id: carsId})
        .update(car)
        .then(count => {
            if(count){
                res.status(201).json({message: "Data successful update"})
            }else{
                res.status(404).json({message: "Can not found Valid Id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Problem while update data"})
        })
})
router.delete('/:id', (req, res) => {
    const carsId = req.params.id;
    db('cars-dealer')
        .where({id: carsId})
        .del()
        .then(ids => {
            if(ids){
                res.status(201).json({message: "Successful delete car data"})
            }else{
                res.status(404).json({message: "Can not find valid Id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Processing fail"}, err)
        });
});
function validateCarId(req, res, next) {
    CarDB.get(req.params.id)
       .then(car => {
         if(car){
           req.car = car;
           next();
         }else if (!car){
           res.status(400).json({ message: "invalid user id" })
         }
       })
       .catch(err => {
         console.log(err)
         res.status(500).json({
           message: "Err while get Id"
         })
       })
   }
module.exports = router;