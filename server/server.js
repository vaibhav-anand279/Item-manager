const pg=require('pg');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
const port = 5001;

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app']
}));

app.use(express.json({ limit: '10mb' }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Vaibhav1234@',
  port: 5433,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password',
  },
});

app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  const { name, type, description, cover, images } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, type, description, cover, images) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, type, description, cover, JSON.stringify(images)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enquire', async (req, res) => {
  const { name } = req.body;
  try {
    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: 'receiver_email@example.com',
      subject: 'New Item Enquiry',
      text: `User is interested in: ${name}`,
    });
    res.json({ message: 'Enquiry email sent.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
