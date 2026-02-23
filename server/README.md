# Employee CRUD API (lukasdb)

Backend for the Employee Management page. Connects to MySQL database **lukasdb**.

**No manual MySQL setup needed.** When you start the server, it automatically creates the `lukasdb` database and the `Employees` table if they don’t exist. You only need MySQL (or your MySQL host) running and your credentials in `.env`.

## Setup

1. **Configure environment** (optional if you use the defaults in `db.js`)  
   Copy `.env.example` to `.env` and set your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=lukasdb
   PORT=3001
   ```

2. **Install and run**
   ```bash
   npm install
   npm run dev
   ```
   On startup, the server creates `lukasdb` and the `Employees` table, then listens at `http://localhost:3001`. The Vite app proxies `/api` to this server when you run `npm run dev` from the project root.

## API

- `GET /api/employees` – list all employees  
- `POST /api/employees` – create employee (JSON body)  
- `PUT /api/employees/:id` – update employee  
- `DELETE /api/employees/:id` – delete employee  
