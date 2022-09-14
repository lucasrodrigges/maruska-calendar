/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BandForm from './components/BandForm';
import Calendar from './pages/Calendar';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="./maruska-calendar/" element={<Login />} />
      <Route path="./maruska-calendar/calendario" element={<Calendar />} />
      <Route path="./maruska-calendar/banda" element={<BandForm />} />
    </Routes>
  );
}
