import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'my-db.cr1b9933gaye.us-east-1.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Timndbpw10',
  database: process.env.DB_NAME || 'lukasdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
