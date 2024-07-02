const router = require('express').Router();
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');

router.get('/zookeepers', (req, res) => {
    // result will contain animals JSON data
    let results = zookeepers;

    // If a request for the query is true, run filterByQuery to collect the query parameter of the animal
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted');
    } else {
        // add animal to json file and animals array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;