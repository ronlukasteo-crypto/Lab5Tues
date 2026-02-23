import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import { initDb } from './initDb.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, first_name, last_name, address, city, state, zip, email, salary FROM Employees ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// POST create employee
app.post('/api/employees', async (req, res) => {
  const { first_name, last_name, address, city, state, zip, email, salary } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  try {
    const [result] = await pool.query(
      `INSERT INTO Employees (first_name, last_name, address, city, state, zip, email, salary)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name || '',
        last_name || '',
        address || '',
        city || '',
        state || '',
        zip || '',
        email || '',
        salary ? Number(salary) : null,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM Employees WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// PUT update employee
app.put('/api/employees/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { first_name, last_name, address, city, state, zip, email, salary } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  try {
    await pool.query(
      `UPDATE Employees SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, email=?, salary=? WHERE id=?`,
      [
        first_name || '',
        last_name || '',
        address || '',
        city || '',
        state || '',
        zip || '',
        email || '',
        salary ? Number(salary) : null,
        id,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM Employees WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// DELETE employee
app.delete('/api/employees/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [result] = await pool.query('DELETE FROM Employees WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database setup failed:', err.message);
    process.exit(1);
  });
