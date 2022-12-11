import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToLS } from '../services/localStorage';
import '../style/UserRegister.css';
import maruskaLogo from '../images/maruska-logo.png';
import { createUser } from '../api/user';
import { GlobalContext } from '../context/GlobalProvider';

export default function UserRegister() {
  const { setUserToken } = useContext(GlobalContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name, email, password, confPass,
    } = user;

    if (password === confPass) {
      const { status, data, message } = await createUser({ name, email, password });

      if (status !== 204) {
        setCreateError(message);
      }

      setToLS('token', { token: data.token });
      setUserToken(data.token);
    } else {
      setCreateError('As senhas estão diferentes, favor verifique.');
    }
  };

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
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </form>
  );
}
