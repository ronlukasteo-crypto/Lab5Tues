import mysql from 'mysql2/promise';
import pool from './db.js';

const DB_NAME = process.env.DB_NAME || 'lukasdb';

/**
 * Creates lukasdb and Employees table if they don't exist.
 * Run this on server startup so you never have to run MySQL manually.
 */
export async function initDb() {
  let conn;
  const host = process.env.DB_HOST || 'my-db.cr1b9933gaye.us-east-1.rds.amazonaws.com';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'admin';
  const password = process.env.DB_PASSWORD || 'Timndbpw10';
  try {
    conn = await mysql.createConnection({ host, port, user, password });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await conn.end();
  } catch (err) {
    console.error('Could not create database:', err.message);
    throw err;
  }

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS Employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      address VARCHAR(255) DEFAULT NULL,
      city VARCHAR(100) DEFAULT NULL,
      state VARCHAR(50) DEFAULT NULL,
      zip VARCHAR(20) DEFAULT NULL,
      email VARCHAR(255) DEFAULT NULL,
      salary DECIMAL(12, 2) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.query(createTableSql);
    console.log(`Database "${DB_NAME}" and table Employees are ready.`);
  } catch (err) {
    console.error('Could not create Employees table:', err.message);
    throw err;
  }
}
