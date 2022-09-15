/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BandForm from './pages/BandForm/BandForm';
import Calendar from './pages/Calendar/Calendar';
import Login from './pages/Login/Login';
import MusicianRegister from './pages/MusRegister/MusRegister';
import Register from './pages/Register/Register';

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
