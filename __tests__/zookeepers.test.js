import { jest } from '@jest/globals'
import fs from 'fs';


jest.mock('fs');

import { filterByQuery, findById, createNewZookeeper, validateZookeeper } from '../lib/zookeepers.js';
import data from '../data/zookeepers.json';

const zookeepers = data.zookeepers

test('Create a new zookeeper object', () => {
    const zookeeper = createNewZookeeper (
        { name: 'Bobby', id: 'test123' },
        zookeepers
    );

    expect(zookeeper.name).toBe('Bobby');
    expect(zookeeper.id).toBe('test123');
});

test('Filters by query', () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const updatedZookeepers = filterByQuery({age: 31}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('Find by ID', () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ]

    const result = findById('1', startingZookeepers);

    expect(result.name).toBe('Raksha');
})

test('Validate zookeeper favorite animal', () => {
    const zookeeper = {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    }

    const invalidZookeeper = {
        id: "1",
        name: "Raksha",
        age: 31,
    }

    const result1 = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
})