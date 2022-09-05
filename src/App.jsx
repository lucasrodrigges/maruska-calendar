/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="calendario" element={<Calendar />} />
    </Routes>
  );
}
