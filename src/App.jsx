import React from 'react';
import Main from './Pages/Home.jsx';
import EmployeeManagement from './Pages/EmployeeManagement.jsx'; // Ensure this path is correct
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/employee-management" element={<EmployeeManagement />} />
    </Routes>
  );
}

export default App;
