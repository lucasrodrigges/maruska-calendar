import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../services/firebase';
import setToLS from '../../services/localStorage';

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
        navigate('calendario');
      })
      .catch(() => setLoginError('Usuário não cadastrado ou campo de email e/ou senha incorretos.'));
  }

  function goToAccountCreate() {
    navigate('novo-usuario');
  }

  return (
    <form action="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">
        Email:
        <input type="email" name="email" id="email" onChange={handleChange} />
      </label>

      <label htmlFor="pass">
        Senha:
        <input type="password" name="pass" id="pass" onChange={handleChange} />
      </label>
      {loginError && <p>{loginError}</p>}
      <button type="submit">Entrar</button>
      <button type="button" onClick={goToAccountCreate}>Não possui um conta?</button>
    </form>
  );
}
