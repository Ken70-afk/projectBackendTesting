// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Neon PostgreSQL connection
const pool = new Pool({
  connectionString: 'postgresql://operationmeraki_owner:npg_BlfxeIi1vOE2@ep-crimson-glade-a5ydc3xk-pooler.us-east-2.aws.neon.tech/operationmeraki?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    veteran,
    programInterest,
    serviceBranch,
    state,
    comment
  } = req.body;

  try {
    // Insert into the database, excluding ID (auto-generated)
    const result = await pool.query(
      `INSERT INTO veteran 
      ("firstName", "lastName", "email", "phone", "veteran", "programInterest", "serviceBranch", "state", "comment")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      [firstName, lastName, email, phone, veteran, programInterest, serviceBranch, state, comment]
    );

    const insertedId = result.rows[0].id;
    res.status(200).send(`Form submitted successfully!`);
  } catch (error) {
    console.error('Error inserting data:', error);

    // If it's a duplicate key error
    if (error.code === '23505') {
      res.status(400).send('A record with this ID or unique field already exists.');
    } else {
      res.status(500).send('Error saving form data.');
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
