import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFromLS } from '../../services/localStorage';
import { app, db } from '../../services/firebase';
import Header from '../../components/Header';
import EventReview from '../../components/EventReview';

export default function BandForm() {
  const [members, setMembers] = useState([]);
  const [musicians, setMusicians] = useState([]);
  const [inputArr, setInputArr] = useState([0]);
  const [errorMessage, setError] = useState('');
  const [showReview, setReview] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken !== currAccessToken) navigate('/');
    });
  }, []);

  useEffect(() => async () => {
    const musiciansArr = [];
    const querySnapshot = await getDocs(collection(db, 'musicians'));
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const musician = doc.data();
      musiciansArr.push({ ...musician, id });
    });
    setMusicians([...musicians, ...musiciansArr]);
  }, []);

  function handleChange({ target: { value } }) {
    const alreadyHasMember = members.some((name) => name === value);

    if (alreadyHasMember) setError('Músico já selecionado');
    else {
      setMembers([...members, value]);
      setError('');
    }
  }

  function changeNumberOfInputs({ target: { name, id: index } }) {
    if (name === '+') {
      setInputArr([...inputArr, inputArr.length]);
    } else if (inputArr.length > 1) {
      if (+index > 0) {
        members.splice(+index, 1);
        setMembers([...members]);
      }
      const i = inputArr.indexOf(0);
      inputArr.splice(i, 1);
      setInputArr([...inputArr]);
    }
  }

  async function handleReview(e) {
    e.preventDefault();
    setReview(true);
  }

  console.log(members);
  console.log(inputArr);

  return (
    <div>
      <Header />
      <h2>Adicione Músicos</h2>
      <form action="" onSubmit={handleReview}>
        {inputArr.map((value, index) => (
          <div>
            <label htmlFor="musician">
              Músico
              <select name="musician" id={index} onChange={handleChange}>
                <option value="">Selecione</option>
                {musicians.length && musicians.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {errorMessage && <p>{errorMessage}</p>}
              <button type="button" name="+" onClick={changeNumberOfInputs}>+</button>
              <button type="button" name="-" id={value} onClick={changeNumberOfInputs}>-</button>
            </label>
          </div>
        ))}
        <button type="submit" disabled={errorMessage}>Revisar</button>
      </form>
      <button type="button" onClick={() => navigate('/novo-musico')}>Cadastrar um novo músico</button>
      {showReview && <EventReview members={members} musicians={musicians} />}
    </div>
  );
}
