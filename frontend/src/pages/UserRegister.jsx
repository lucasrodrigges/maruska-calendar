import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToLS } from '../services/localStorage';
import '../style/UserRegister.css';
import maruskaLogo from '../images/maruska-logo.png';
import fetch from '../services/fetchers/axios';

export default function UserRegister() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPass: '',
  });
  const [userError, setCreateError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

  }, [user.confPass]);

  function handleChange({ target: { name, value } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {
      name, email, password, confPass,
    } = user;

    if (password === confPass) {
      fetch.post('/user', { name, email, password })
        .then(({ data: { token } }) => {
          setToLS('user', token);
          navigate('/calendario');
        })
        .catch((err) => {
          console.error('ERROR => ', err);
          setCreateError('Algo de errado aconteceu, tente novamente mais tarde.');
        });
    } else {
      setCreateError('As senhas estão diferentes, favor verifique.');
    }
  }

  return (
    <form
      className="login-form"
      action="login"
      onSubmit={handleSubmit}
    >
      <img
        id="login-img"
        src={maruskaLogo}
        alt="Maruka Logo"
      />
      <input
        className="input-1"
        type="text"
        name="name"
        id="name"
        placeholder="Seu nome"
        onChange={handleChange}
      />
      <input
        className="input-1"
        type="email"
        name="email"
        id="email"
        placeholder="Seu email"
        onChange={handleChange}
      />
      <input
        className="input-1"
        type="password"
        name="password"
        id="password"
        placeholder="Crie uma senha"
        onChange={handleChange}
      />
      <input
        className="input-1"
        type="password"
        name="confPass"
        id="confPass"
        placeholder="Confirme sua senha"
        onChange={handleChange}
      />
      {userError && <p className="error-message">{userError}</p>}
      <button
        className="button-1"
        type="submit"
      >
        Criar
      </button>
      <button
        className="button-1"
        type="submit"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </form>
  );
}
