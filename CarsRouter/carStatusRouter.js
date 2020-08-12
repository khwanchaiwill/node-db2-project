const express = require('express');

const db = require('../data/dbConfig');
const CarDB = require('../helper/carsModel');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('sales')
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
        .from('sales')
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

router.post('/:id', validateProjectsId, (req, res) => {
    const sales = req.body
    const id = req.params.id; 
      console.log(req.params.id)
      sales.car_id = Number(id);
    db("sales")
    .insert(sales)
    .returning('"id')
    .then(ids => {
        if(ids){
            res.status(201).json(sales);
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
    db('sales')
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
    db('sales')
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

function validateProjectsId(req, res, next) {
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