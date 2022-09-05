import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import setToLS from '../services/localStorage';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });
  const [loginError, setLoginError] = useState('');

  const auth = getAuth(app);
  const navigate = useNavigate();

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
        setToLS('session', { userId: currUser.user.uid });
        navigate('/calendario');
      })
      .catch(() => setLoginError('Campo de email e/ou senha inválidos'));
  }

  return (
    <form action="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">
        Email:
        <input type="text" name="email" id="email" onChange={handleChange} />
      </label>

      <label htmlFor="pass">
        Senha:
        <input type="password" name="pass" id="pass" onChange={handleChange} />
      </label>
      {loginError && <p>{loginError}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}
