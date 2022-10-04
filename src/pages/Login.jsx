import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import { setToLS } from '../services/localStorage';
import '../style/Login.css';
import maruskaLogo from '../images/maruska-logo.png';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });
  const [loginError, setLoginError] = useState('');

  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    setToLS('session', { accessToken: '' });
  }, []);

  function handleChange({ target: { name, value } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, pass } = user;

    signInWithEmailAndPassword(auth, email, pass)
      .then((currUser) => {
        setToLS('session', { accessToken: currUser.user.accessToken });
        navigate('/calendario');
      })
      .catch(() => setLoginError('Usuário não cadastrado ou campo de email e/ou senha incorretos.'));
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
        name="pass"
        id="pass"
        placeholder="Senha"
        onChange={handleChange}
      />
      {loginError && <p className="login-error">{loginError}</p>}
      <button
        className="first-button button-1"
        type="submit"
      >
        Login
      </button>
      <Link
        to="/novo-usuario"
      >
        Criar uma conta
      </Link>
    </form>
  );
}
