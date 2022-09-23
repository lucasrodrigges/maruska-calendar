import React, { useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { db } from '../services/firebase';
import { EventContext } from '../context/EventProvider';

export default function EventReview() {
  const { event, members } = useContext(EventContext);

  const navigate = useNavigate();

  async function handleConfirm() {
    const eventToSubmit = {
      ...event,
      members,
    };

    await addDoc(collection(db, 'events'), eventToSubmit);
    navigate('/calendario');
  }

  return (
    <div>
      <h3>{event.location}</h3>
      <p>{convertDateAndTime(event.date, event.time)}</p>
      <ul>
        Banda:
        {members.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button type="button" onClick={() => navigate(-1)}>Editar</button>
      <button type="button" onClick={handleConfirm}>Confirmar</button>
    </div>
  );
}
