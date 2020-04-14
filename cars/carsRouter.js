const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexfile = require('../knexfile');
const db = knex(knexfile.development);

//MVP = CREATE & READ 

//GET /api/cars
router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Problem retrieving cars" });
    });
});

//GET /api/cars/id
router.get('/:id', (req, res) => {
    const id = req.params;
    db('cars').where(id)
        .then(car => {
            if (car) {
            res.status(200).json(car);
            } else {
                res.status(404).json({ message: "car not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "problem retrieving selected car" });
        });
});

//POST /api/cars
router.post('/', (req, res) => {
    const cars = req.body;
    if (!cars.VIN || !cars.make || !cars.model || !cars.mileage) {
        res.status(400).json({ message: "all fields required" });
    } else {
        db('cars').insert(cars)
            .then(car => {
                res.status(201).json(car);
            })
            .catch(err => {
                res.status(500).json({ message: "problem creating car" });
            });
    }
});

module.exports = router;