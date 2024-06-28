// Left off at 11.4.3
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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});