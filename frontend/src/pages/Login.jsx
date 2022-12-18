import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToLS } from '../services/localStorage';
import '../style/Login.css';
import maruskaLogo from '../images/maruska-logo.png';
import { GlobalContext } from '../context/GlobalProvider';
import { login } from '../api/routes/userRoute';

export default function Login() {
  const { setUser, setUserToken } = useContext(GlobalContext);
  const [currUser, setCurrUser] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  function handleChange({ target: { name, value } }) {
    setCurrUser({
      ...currUser,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(currUser).then(({ status, data }) => {
      if (status === 200) {
        setUser({ email: currUser.email });
        setUserToken(data.token);
        setToLS('token', data.token);
        navigate('/');
      } else {
        setLoginError('Email ou senha inválidos.');
      }
    });
  }

  return (
    <form className="login-form" action="login" onSubmit={handleSubmit}>
      <img
        id="login-img"
        src={maruskaLogo}
        alt="Maruka Logo"
      />
      <input
        className="input-1"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="input-1"
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        onChange={handleChange}
      />
      {loginError && <p className="error-message">{loginError}</p>}
      <button
        className="first-button button-1"
        type="submit"
      >
        Login
      </button>
      <Link
        className="new-account-link"
        to="/novo-usuario"
      >
        Criar uma conta
      </Link>
    </form>
  );
}
