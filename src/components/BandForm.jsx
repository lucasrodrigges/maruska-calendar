import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc, collection, query, getDocs,
} from 'firebase/firestore';
import setToLS, { getFromLS } from '../services/localStorage';
import { db } from '../services/firebase';
import sendTelegramMessage from '../services/telegramBot';
import convertDateAndTime from '../helpers/convertDateAndTime';

export default function BandForm() {
  const [numOfMembers, setNumOfMembers] = useState(0);
  const [members, setMembers] = useState([]);
  const [inputArr, setInputArr] = useState([]);
  const [hasNumber, setNumber] = useState(false);
  const [musicians, setMusicians] = useState([]);
  const [hasNewUser, setNewUser] = useState(false);

  const instruments = ['Selecione', 'Violão/Guitarra', 'Teclado/Piano', 'Contrabaixo', 'Bateria', 'Percussão'];

  const q = query(collection(db, 'musicians'));

  const navigate = useNavigate();

  useEffect(() => async () => {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((currDoc) => {
      const response = currDoc.data();
      const { musicians: musiciansArr } = response;
      setMusicians(musiciansArr);
    });
  }, []);

  function handleConfirm() {
    const arr = Object.keys(new Array(numOfMembers + 1).fill(null)).map(Number);
    arr.shift();
    setInputArr(arr);
    setNumber(true);
  }

  function handleChange({ target: { value } }) {
    setMembers([...members, value]);
  }

  async function addMusician() {
    setNewUser(true);
  }

  async function handleAddEvent() {
    const event = getFromLS('event');
    const musiciansArr = [];

    members.forEach(async (member) => {
      const newMember = musicians.find(({ name }) => name === member);
      const { id } = newMember;
      const { date, time } = event;
      const msg = `Olá ${newMember.name}, tudo bem?

Vai ficar melhor agora porque tem cachê!  💁‍♀️💸
Um show da Maruska abou de ser marcado contigo!
Até lá, e aguardo para matarmos a saudade ❤

Data:  Dia ${convertDateAndTime(date, time)}!
Localização:  

Para mais informações acesse o link.`;

      musiciansArr.push(newMember);
      if (id) {
        await sendTelegramMessage(id, msg);
      }
    });

    await addDoc(collection(db, 'events'), { ...event, members: musiciansArr });
    setToLS('event', { ...event, musiciansArr });
    navigate('/calendario');
  }

  return (
    <div>
      <form>
        {!hasNumber ? (
          <div>
            <label htmlFor="numOfMembers">
              Quantos integrantes a mais?
              <input type="number" name="numOfMembers" id="numOfMembers" onChange={({ target: { value } }) => setNumOfMembers(+value)} />
            </label>
            <button type="button" onClick={handleConfirm}>Confirmar</button>
          </div>
        ) : (
          <div>
            {inputArr.length && inputArr.map((num) => (
              <div key={num}>
                <label htmlFor="name">
                  Nome:
                  <select name="name" id={`integrante${num}`} onChange={handleChange}>
                    <option value="">Selecione</option>
                    {musicians.length && musicians.map(({ name }) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </label>
                {hasNewUser && (
                  <label htmlFor="instrument">
                    Instrumento:
                    <select name="instrument" id={`integrante${num}`} onChange={handleChange}>
                      {instruments.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            ))}
            <button type="button" onClick={addMusician}>Adicionar músico que não está na lista</button>
            <button type="button" onClick={handleAddEvent}>Finalizar</button>
          </div>
        )}
      </form>
    </div>
  );
}
