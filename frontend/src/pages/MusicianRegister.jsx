import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../style/MusicianRegister.css';
import Footer from '../components/Footer';
import UseAxios from '../hooks/UseAxios';

export default function MusicianRegister() {
  const [musician, setMusician] = useState({
    name: '',
    instrument: '',
    phoneNumber: '',
  });
  const [errorMessage, setError] = useState('');

  const navigate = useNavigate();
  const axios = UseAxios();

  useEffect(() => {
    const isAdmin = axios.get('/user/me').then(({ data }) => data.isAdmin);
    if (!isAdmin) navigate('/calendario');
  }, []);

  function handleChange({ target: { name, value } }) {
    const currValue = name === 'phoneNum' ? `55${value}` : value;
    setMusician({
      ...musician,
      [name]: currValue,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { phoneNumber } = musician;
    const minLength = 13;

    if (phoneNumber.length < minLength && !Number(phoneNumber)) {
      setError('O número precisa estar no formato válido!');
    } else {
      axios.post('/musician', musician).then(() => {
        navigate(-1);
      }).catch((err) => {
        console.error('ERROR => ', err);
        setError('Não foi possível adicionar músico ao banco de dados. Estamos tentando resolver o problema o mais rápido possível. Tente novamente mais tarde!');
      });
    }
  }

  return (
    <div>
      <Header />
      <form
        className="musician-register-form"
        onSubmit={handleSubmit}
      >
        <h1 className="musician-register-title">Informações Pessoais</h1>
        <input
          className="input-1"
          type="text"
          name="name"
          id="name"
          placeholder="Nome ou apelido"
          onChange={handleChange}
        />
        <input
          className="input-1"
          type="text"
          name="instrument"
          id="instrument"
          placeholder="Instrumento(s)"
          onChange={handleChange}
        />
        <input
          className="input-1"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Telefone com 11 dígitos (Opcional)"
          onChange={handleChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          className="button-1"
          type="submit"
        >
          Adicionar
        </button>
      </form>
      <Footer />
    </div>
  );
}
