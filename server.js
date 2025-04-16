const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000; // 🚨 Must use Railway's dynamic port

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL connection (shared pool for both forms)
const pool = new Pool({
  connectionString: 'postgresql://operationmeraki_owner:npg_BlfxeIi1vOE2@ep-crimson-glade-a5ydc3xk-pooler.us-east-2.aws.neon.tech/operationmeraki?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ Root test route (optional)
app.get("/", (req, res) => {
  res.send("Unified backend is running!");
});

// ===========================
// 🚀 VETERAN FORM ENDPOINT
// ===========================
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
    const result = await pool.query(
      `INSERT INTO veteran 
      ("firstName", "lastName", "email", "phone", "veteran", "programInterest", "serviceBranch", "state", "comment")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      [firstName, lastName, email, phone, veteran, programInterest, serviceBranch, state, comment]
    );

    res.status(200).send(`Veteran form submitted successfully!`);
  } catch (error) {
    console.error('Veteran form error:', error);
    if (error.code === '23505') {
      res.status(400).send('Duplicate entry.');
    } else {
      res.status(500).send('Error saving veteran form.');
    }
  }
});

// =============================
// 🚀 VOLUNTEER FORM ENDPOINT
// =============================
app.post('/volunteer-submit', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    street,
    city,
    state,
    zip,
    availability,
    interests
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO volunteer 
      ("fullName", "email", "phone", "streetAddress", "City", "state", "zipCode", "availability", "areaOfInterest")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      [fullName, email, phone, street, city, state, zip, availability, interests]
    );

    res.status(200).send(`Volunteer form submitted successfully!`);
  } catch (error) {
    console.error('Volunteer form error:', error);
    if (error.code === '23505') {
      res.status(400).send('Duplicate entry.');
    } else {
      res.status(500).send('Error saving volunteer form.');
    }
  }
});

// ✅ Start unified server
app.listen(PORT, () => {
  console.log(`Unified server running on port ${PORT}`);
});
