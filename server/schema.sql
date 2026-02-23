-- Run this in MySQL to create the database and Employees table for lukasdb
CREATE DATABASE IF NOT EXISTS lukasdb;
USE lukasdb;

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
);

-- Optional: seed a couple of rows
INSERT INTO Employees (first_name, last_name, address, city, state, zip, email, salary) VALUES
('John', 'Doe', '123 Main St', 'Los Angeles', 'CA', '90001', 'johndoe@example.com', 80000),
('Jane', 'Smith', '456 Elm St', 'New York', 'NY', '10001', 'janesmith@example.com', 95000);
