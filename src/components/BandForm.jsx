import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc, collection, query, getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import setToLS, { getFromLS } from '../services/localStorage';
import { app, db } from '../services/firebase';
import convertDateAndTime from '../helpers/convertDateAndTime';
import sendWppMessage from '../services/wppBot';

export default function BandForm() {
  const [members, setMembers] = useState([]);
  const [musicians, setMusicians] = useState([{ name: 'Selecione' }]);
  const [inputArr, setInputArr] = useState([]);

  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => async () => {
    const q = query(collection(db, 'musicians'));
    const querySnapshot = await getDocs(q, auth);

    querySnapshot.forEach((currDoc) => {
      const response = currDoc.data();
      const { musicians: musiciansArr } = response;
      setMusicians([...musicians, ...musiciansArr]);
    });
  }, []);

  function handleChange({ target: { value } }) {
    setMembers([...members, value]);
  }

  function addMusician() {
    setInputArr([...inputArr, inputArr.length + 1]);
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
        <button type="button" onClick={addMusician}>+</button>
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
            <button type="button" onClick={addMusician}>+</button>
          </div>
        ))}
        <button type="submit">Finalizar</button>
      </form>
    </div>
  );
}
