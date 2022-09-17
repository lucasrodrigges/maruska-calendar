import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../../services/firebase';
import Header from '../../components/Header';
import { getFromLS } from '../../services/localStorage';

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
    setMusician({
      ...musician,
      [name]: value,
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <label htmlFor="instrument">
          Instrumento
          <input type="text" name="instrument" id="instrument" onChange={handleChange} />
        </label>
        <label htmlFor="phoneNum">
          Telefone (opcional)
          <input type="text" name="phoneNum" id="phoneNum" placeholder="Somente números" onChange={handleChange} />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Adicionar</button>
      </form>
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
