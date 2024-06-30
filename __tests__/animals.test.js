const fs = require('fs');
jest.mock('fs');

const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../lib/animals');
const { animals } = require('../data/animals.json');
const { start } = require('repl');

test('Create an animal object', () => {
    const animal = createNewAnimal(
        { name: 'Freya', id: 'test1234' },
        animals
    );

    expect(animal.name).toBe('Freya');
    expect(animal.id).toBe('test1234');
});

test('Filters by query', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const updatedAnimals = filterByQuery({species: 'gorilla' }, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

test('Find by ID', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const result = findById('3', startingAnimals);

    expect(result.name).toBe('Erica');
});

test('Validate personality traits', () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };
    
    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };

    const result1 = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
});