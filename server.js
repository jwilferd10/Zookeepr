// Left off at 11.3.5
const { animals } = require('./data/animals');
const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
const fs = require('fs');
const path = require('path');

// parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

const filterByQuery = (query, animalsArray) => {

    let personalityTraitsArray = []; 

    // filteredResults holds the JSON data from animals.json array
    let filteredResults = animalsArray;
    
    // Filter animal details based on query parameter

    if (query.personalityTraits) {
        // Save personalityTraits in a dedicated array
        // Convert single traits into an array 
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // Looping through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // initially a copy of the animalsArray, here we're updating it for each trait in the .forEach() loop.
            // forEach trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait.
            // at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    // Collects animals based on type of diet
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    // Collects animals based on their species
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    // Collects animals based on a name
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    // Return filtered results
    return filteredResults;
} 

const findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

const createNewAnimal = (body, animalsArray) => {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
}

const validateAnimal = (animal) => {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }

    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }

    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }

    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }

    return true;
}

app.get('/api/animals', (req, res) => {
    // result will contain animals JSON data
    let results = animals;

    // If a request for the query is true, run filterByQuery to collect the query parameter of the animal
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});