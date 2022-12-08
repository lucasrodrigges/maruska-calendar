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
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="perfil" element={<Profile />} />
      <Route path="editar-perfil" element={<ProfileEdit />} />
      <Route path="painel-de-controle" element={<AdminDashboard />} />
      <Route path="novo-usuario" element={<UserRegister />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="novo-show" element={<EventRegister />} />
      <Route path="banda" element={<BandForm />} />
      <Route path="novo-musico" element={<MusicianRegister />} />
      <Route path="musicos" element={<Musicians />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}