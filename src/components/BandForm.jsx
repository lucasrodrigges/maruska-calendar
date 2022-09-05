import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import setToLS, { getFromLS } from '../services/localStorage';
import { db } from '../services/firebase';

export default function BandForm() {
  const [numOfMembers, setNumOfMembers] = useState(0);
  const [members, setMembers] = useState({});
  const [inputArr, setInputArr] = useState([]);
  const [hasNumber, setNumber] = useState(false);

  const instruments = ['Selecione', 'Violão/Guitarra', 'Teclado/Piano', 'Contrabaixo', 'Bateria', 'Percussão'];

  const navigate = useNavigate();

  useEffect(() => {
    const initialMembers = inputArr.reduce((acc, curr) => {
      acc[`integrante${curr}`] = {
        name: 'Integrante',
        instrument: '',
      };
      return acc;
    }, {});
    setMembers(initialMembers);
  }, [inputArr]);

  function handleConfirm() {
    const arr = Object.keys(new Array(numOfMembers + 1).fill(null)).map(Number);
    arr.shift();
    setInputArr(arr);
    setNumber(true);
  }

  function handleChange({ target: { id, name, value } }) {
    setMembers({
      ...members,
      [id]: {
        ...members[id],
        [name]: value,
      },
    });
  }

  async function handleAddEvent() {
    const event = getFromLS('event');

    await addDoc(collection(db, 'events'), { ...event, members });
    setToLS('event', { ...event, members });
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
                <h2>{ Object.keys(members).length && members[`integrante${num}`].name}</h2>
                <label htmlFor="name">
                  Nome:
                  <input name="name" id={`integrante${num}`} type="text" onChange={handleChange} />
                </label>
                <label htmlFor="instrument">
                  Instrumento:
                  <select name="instrument" id={`integrante${num}`} onChange={handleChange}>
                    {instruments.map((item) => (
                      <option key={item} value="">{item}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="email">
                  Se possível, email:
                  <input type="email" name="email" id={`integrante${num}`} onChange={handleChange} />
                </label>
              </div>
            ))}
            <button type="button" onClick={handleAddEvent}>Confirmar</button>
          </div>
        )}
      </form>
    </div>
  );
}
