const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');

// Middleware to parse request body as JSON
app.use(express.json());

// Configure the database connection
const pool = new Pool({
  user: 'ramilvaliyev',
  host: 'localhost',
  database: 'quizdb',
  password: 'ramilvlyv.',
  port: 5433 // Default PostgreSQL port
});

// Create a table to store user information if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);
`;

pool.query(createTableQuery, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');
  }
});

// Save user information to the database
app.post('/saveUserInfo', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const insertQuery = `
    INSERT INTO users (first_name, last_name)
    VALUES ($1, $2)
    RETURNING *;
  `;

  pool.query(insertQuery, [firstName, lastName], (err, result) => {
    if (err) {
      console.error('Error saving user information:', err);
      res.sendStatus(500);
    } else {
      const savedUserInfo = result.rows[0];
      console.log('User information saved successfully:', savedUserInfo);

      // Respond to the client with the saved user information
      res.json(savedUserInfo);
    }
  });
});

// Serve the static files for the index.html and quiz.js files
app.use(express.static(path.join(__dirname, 'assets')));

// Serve index.html for the root URL '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
