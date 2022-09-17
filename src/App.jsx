/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BandForm from './pages/BandForm/BandForm';
import Calendar from './pages/Calendar/Calendar';
import EventRegister from './pages/Registers/EventRegister';
import Login from './pages/Login/Login';
import MusicianRegister from './pages/Registers/MusicianRegister';
import UserRegister from './pages/Registers/UserRegister';
import Musicians from './pages/Musicians/Musicians';

export default function App() {
  return (
    <Routes>
      <Route path="/maruska-calendar" element={<Login />} />
      <Route path="novo-usuario" element={<UserRegister />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="novo-show" element={<EventRegister />} />
      <Route path="banda" element={<BandForm />} />
      <Route path="novo-musico" element={<MusicianRegister />} />
      <Route path="musicos" element={<Musicians />} />
    </Routes>
  );
}
