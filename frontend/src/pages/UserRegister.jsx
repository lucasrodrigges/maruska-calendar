import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToLS } from '../services/localStorage';
import '../style/UserRegister.css';
import maruskaLogo from '../images/maruska-logo.png';
import { GlobalContext } from '../context/GlobalProvider';
import UserRoute from '../hooks/axios/routes/UserRoute';

export default function UserRegister() {
  const { setUserToken } = useContext(GlobalContext);

  const [currUser, setCurrUser] = useState({
    name: '',
    email: '',
    password: '',
    confPass: '',
  });
  const [userError, setCreateError] = useState('');

  const navigate = useNavigate();
  const route = UserRoute();

  useEffect(() => {

  }, [currUser.confPass]);

  function handleChange({ target: { name, value } }) {
    setCurrUser({
      ...currUser,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name, email, password, confPass,
    } = currUser;

    if (password === confPass) {
      route.createUser({ name, email, password }).then(({ status, data }) => {
        if (status === 201) {
          setUserToken(data.token);
          setToLS('token', data.token);
          navigate('/calendario');
        } else {
          setCreateError(data.message);
        }
      });
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
