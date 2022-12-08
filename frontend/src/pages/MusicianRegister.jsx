import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../services/firebase';
import Header from '../components/Header';
import { getFromLS } from '../services/localStorage';
import '../style/MusicianRegister.css';
import Footer from '../components/Footer';

export default function MusicianRegister() {
  const [musician, setMusician] = useState({
    name: '',
    instrument: '',
    phoneNum: '',
  });
  const [errorMessage, setError] = useState('');

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken !== currAccessToken) navigate('/');
    });
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
    const { phoneNum } = musician;
    const minLength = 13;

    if (phoneNum.length < minLength && !Number(phoneNum)) {
      setError('O número precisa estar no formato válido!');
    } else {
      try {
        await addDoc(collection(db, 'musicians'), musician);
        navigate(-1);
      } catch (err) {
        setError('Não foi possível adicionar músico ao banco de dados. Estamos tentando resolver o problema o mais rápido possível. Tente novamente mais tarde!');
      }
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
          name="phoneNum"
          id="phoneNum"
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
