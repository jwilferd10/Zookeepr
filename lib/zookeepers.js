import fs from 'fs';
import path from 'path';

const filterByQuery = (query, zookeepers) => {
    let filteredResults = zookeepers

    // Log the query and zookeepers data
    // console.log('Query received', query);
    // console.log('Zookeeper Data:', zookeepers);
    // console.log('Type of zookeepers:', typeof zookeepers);
    // console.log('Is zookeepers an array?', Array.isArray(zookeepers));
    
    if (query.age) {
        filteredResults = filteredResults.filter(
            // Form data will come in as strings
            // JSON is storing age as a number, convert query string to a number 
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }

    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter (
            (zookeeper) => zookeeper.favoriteAnimal ===  query.favoriteAnimal
        );
    }

    if (query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }

    return filteredResults;
};

// Filter through the zookeepers to locate specified id
const findById = (id, zookeepers) => {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}

// Adds the zookeeper to the zookeepers.json file
const createNewZookeeper = (body, zookeepers) => {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, '../data/zookeepers.json'),
        JSON.stringify({ zookeepers }, null, 2)
    );
    return zookeeper;
};

// Validate properties of zookeeper
const validateZookeeper = (zookeeper) => {
    if (!zookeeper.name || typeof zookeeper.name !== 'string') {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== 'number') {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
        return false;
    }

    // Return true if all properties are validated
    return true;
};

// Export methods
export { filterByQuery, findById, createNewZookeeper, validateZookeeper };