import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../style/MusicianRegister.css';
import Footer from '../components/Footer';
import { GlobalContext } from '../context/GlobalProvider';
import MusicianRoute from '../hooks/axios/routes/MusicianRoute';

export default function MusicianRegister() {
  const { musicians, setMusicians } = useContext(GlobalContext);
  const [musician, setMusician] = useState({
    name: '',
    instrument: '',
    phoneNumber: '',
  });
  const [errorMessage, setError] = useState('');

  const navigate = useNavigate();
  const route = MusicianRoute();

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
      route.createMusician(musician).then(({ status, data }) => {
        if (status === 201) {
          setMusicians([data, ...musicians]);
          navigate(-1);
        } else setError(data.message);
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
