import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc, collection, getDocs,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import setToLS, { getFromLS } from '../../services/localStorage';
import { app, db } from '../../services/firebase';
import convertDateAndTime from '../../helpers/convertDateAndTime';
import sendWppMessage from '../../services/wppBot';
import Header from '../../components/Header';

export default function BandForm() {
  const [members, setMembers] = useState([]);
  const [musicians, setMusicians] = useState([{ name: 'Selecione' }]);
  const [inputArr, setInputArr] = useState([]);

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
    setMembers([...members, value]);
  }

  function changeNumberOfInputs({ target: { id } }) {
    if (id === '-') {
      const newInputArr = Array(inputArr.length - 1).fill(null);
      setInputArr(newInputArr);

      // eslint-disable-next-line max-len
      // TODO fix the error at browser console: Warning: Each child in a list should have a unique "key" prop.
    } else {
      setInputArr([...inputArr, inputArr.length + 1]);
    }
  }

  async function handleAddEvent(e) {
    e.preventDefault();

    const event = getFromLS('event');
    const musiciansArr = [];

    members.forEach(async (member) => {
      const newMember = musicians.find(({ name }) => name === member);
      const { number } = newMember;
      const { date, time, location } = event;

      musiciansArr.push(newMember);
      if (number) {
        const msgObj = {
          number, musician: member, date: convertDateAndTime(date, time), location,
        };

        await sendWppMessage(msgObj);
      }
      navigate('/calendario');
    });

    await addDoc(collection(db, 'events'), { ...event, members: musiciansArr }, auth);
    setToLS('event', { ...event, musiciansArr });
    navigate('/calendario');
  }

  return (
    <div>
      <Header />
      <h2>Adicione Músicos</h2>
      <form action="" onSubmit={handleAddEvent}>
        <label htmlFor="musician">
          Músico:
          <select name="musician" id="musician" onChange={handleChange}>
            {musicians.length && musicians.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={changeNumberOfInputs}>+</button>
        {inputArr.map(() => (
          <div>
            <label htmlFor="musician">
              Músico
              <select name="musician" id="musician" onChange={handleChange}>
                {musicians.length && musicians.map(({ name }) => (

                  <option key={name} value={name}>{name}</option>

                ))}
              </select>
            </label>
            <button type="button" id="-" onClick={changeNumberOfInputs}>-</button>
            <button type="button" id="+" onClick={changeNumberOfInputs}>+</button>
          </div>
        ))}
        <button type="submit">Finalizar</button>
      </form>
      <button type="button" onClick={() => navigate('/novo-musico')}>Adicionar um novo músico</button>
    </div>
  );
}
