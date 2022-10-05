/* eslint-disable require-jsdoc */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BandForm from './pages/BandForm';
import Calendar from './pages/Calendar';
import EventRegister from './pages/EventRegister';
import Login from './pages/Login';
import MusicianRegister from './pages/MusicianRegister';
import UserRegister from './pages/UserRegister';
import Musicians from './pages/Musicians';
import './style/Reset.css';
import './style/App.css';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="novo-usuario" element={<UserRegister />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="novo-show" element={<EventRegister />} />
      <Route path="banda" element={<BandForm />} />
      <Route path="novo-musico" element={<MusicianRegister />} />
      <Route path="musicos" element={<Musicians />} />
    </Routes>
  );
}
