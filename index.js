import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json()); // Make sure this is present and correct

// Array to store tea data and a counter for unique IDs
let teaData = [];
let nextId = 1;

// POST route to add new tea
app.post('/teas', (req, res) => {
    // Destructure name and price from the request body
    const { name, price } = req.body;

    // --- IMPORTANT: Add validation here ---
    // Check if name and price are provided
    if (!name || !price) {
        return res.status(400).send({ message: 'Name and price are required for a new tea.' });
    }

    // Create a new tea object with a unique ID
    const newTea = { id: nextId++, name, price };

    // Add the new tea to the teaData array
    teaData.push(newTea);

    // Send the newly created tea object with a 201 Created status
    res.status(201).send(newTea);
});

// GET route to retrieve all tea data (if that was the intention of your second POST)
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});