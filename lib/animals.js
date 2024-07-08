const fs = require('fs');
const path = require('path');

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
}; 

// Filter through the animalsArray to locate specified id
const findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// Adds the animal to the animals.json file
const createNewAnimal = (body, animalsArray) => {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
};

// Validate the properties of the animal
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

    // Return true if all properties are validated
    return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};