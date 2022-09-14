/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BandForm from './pages/BandForm';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import MusicianRegister from './pages/MusRegister';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="novo-usuario" element={<Register />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="banda" element={<BandForm />} />
      <Route path="novo-musico" element={<MusicianRegister />} />
    </Routes>
  );
}
