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
  const [musicians, setMusicians] = useState([{ name: 'Selecione' }]);
  const [inputArr, setInputArr] = useState([]);
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

  function handleChange({ target: { value, id } }) {
    const alreadyHasMember = members.some((name) => name === value);
    members.splice(+id);

    if (alreadyHasMember) setError('Músico já selecionado');
    else {
      // setMembers(members.filter((name) => name !== value));
      setMembers([...members, value]);
      setError('');
    }
  }

  function changeNumberOfInputs({ target: { name, id } }) {
    if (name === '-') {
      const newInputArr = Array(inputArr.length - 1).fill(null);
      setInputArr(newInputArr);

      members.splice(+id);
      setMembers([...members]);

      // eslint-disable-next-line max-len
      // TODO fix the error at browser console: Warning: Each child in a list should have a unique "key" prop.
    } else {
      setInputArr([...inputArr, inputArr.length + 1]);
    }
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    setReview(true);
  }

  return (
    <div>
      <Header />
      <h2>Adicione Músicos</h2>
      <form action="" onSubmit={handleAddEvent}>
        <label htmlFor="musician">
          Músico:
          <select name="musician" id="0" onChange={handleChange}>
            {musicians.length && musicians.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={changeNumberOfInputs}>+</button>
        {inputArr.map((index) => (
          <div>
            <label htmlFor="musician">
              Músico
              <select name="musician" id={index} onChange={handleChange}>
                {musicians.length && musicians.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {errorMessage && <p>{errorMessage}</p>}
              <button type="button" id={index} name="-" onClick={changeNumberOfInputs}>-</button>
              <button type="button" name="+" onClick={changeNumberOfInputs}>+</button>
            </label>

          </div>
        ))}
        <button type="submit" disabled={errorMessage}>Revisar</button>
      </form>
      <button type="button" onClick={() => navigate('/novo-musico')}>Adicionar um novo músico</button>
      {showReview && <EventReview members={members} musicians={musicians} />}
    </div>
  );
}
