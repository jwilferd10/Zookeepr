import apiRoutes from './routes/apiRoutes/index.js';
import htmlRoutes from './routes/htmlRoutes/index.js';
import express from 'express';
const PORT = process.env.PORT || 3001
const app = express();

// Middleware to parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Route handlers
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Serve static files
app.use(express.static('public'));

// Middleware to handle for errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
})

// Start the server
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});