import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import { setToLS } from '../services/localStorage';
import '../style/UserRegister.css';
import maruskaLogo from '../images/maruska-logo.png';

export default function UserRegister() {
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
        type="email"
        name="email"
        id="email"
        placeholder="Seu email"
        onChange={handleChange}
      />
      <input
        className="input-1"
        type="password"
        name="pass"
        id="pass"
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
      {userError && <p className="login-error">{userError}</p>}
      <button
        className="button-1"
        type="submit"
      >
        Criar
      </button>
      <button
        className="button-1"
        type="button"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </form>
  );
}
