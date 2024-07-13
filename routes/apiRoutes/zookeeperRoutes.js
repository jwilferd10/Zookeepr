import express from 'express';
import { filterByQuery, findById, createNewZookeeper, validateZookeeper } from '../../lib/zookeepers.js';
import zookeeperData from '../../data/zookeepers.json' assert { type: 'json' };

// Deconstruct the zookeepers array for global use
const { zookeepers } = zookeeperData;

// Create router instance
const router = express.Router();

router.get('/zookeepers', (req, res) => {
    // console.log('Incoming query:', req.query);
    // console.log('Type of zookeepers:', typeof zookeepers);

    // result will contain animals JSON data
    let results = zookeepers;

    // console.log('Initial results:', results)

    // If a request for the query is true, run filterByQuery to collect the query parameter of the animal
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    //  // Log filtered results
    //  console.log('Filtering results:', results)

    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted');
    } else {
        // add animal to json file and animals array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

// export router instance's defined routes
export default router;