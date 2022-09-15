import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../services/firebase';
import setToLS from '../../services/localStorage';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    pass: '',
    confPass: '',
  });
  const [userError, setCreateError] = useState('');

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
    const { email, pass, confPass } = user;

    if (pass === confPass) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          setToLS('session', { accessToke: userCredential.user.accessToken });
          navigate('/calendario');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setCreateError('Este e-mail já existe em nossa base, você esqueceu a sua senha?');
          }
        });
    } else {
      setCreateError('As senhas estão diferentes, favor verifique.');
    }
  }

  return (
    <form action="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">
        Seu Email:
        <input type="email" name="email" id="email" onChange={handleChange} />
      </label>

      <label htmlFor="pass">
        Sua Senha:
        <input type="password" name="pass" id="pass" onChange={handleChange} />
      </label>

      <label htmlFor="confPass">
        Confirme a Senha:
        <input type="password" name="confPass" id="confPass" onChange={handleChange} />
      </label>
      {userError && <p>{userError}</p>}
      <button type="submit">Criar</button>
      <button type="button" onClick={() => navigate('/')}>Voltar</button>
    </form>
  );
}
