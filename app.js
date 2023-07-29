const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');

app.use(express.json());

const pool = new Pool({
  user: 'ramilvaliyev',
  host: 'localhost',
  database: 'quizdb',
  password: 'ramilvlyv.',
  port: 5433 
});

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

      res.json(savedUserInfo);
    }
  });
});

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
