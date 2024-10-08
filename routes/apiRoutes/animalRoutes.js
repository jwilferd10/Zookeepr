import express from 'express';
import { filterByQuery, findById, createNewAnimal, validateAnimal } from '../../lib/animals.js';
import animalsData from '../../data/animals.json' assert { type: 'json' };

const { animals } = animalsData

// Create router instance
const router = express.Router();

router.get('/animals', (req, res) => {
    // result will contain animals JSON data
    let results = animals;

    // If a request for the query is true, run filterByQuery to collect the query parameter of the animal
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

// export router instance's defined routes
export default router;