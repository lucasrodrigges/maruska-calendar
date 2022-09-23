import React from 'react';
import Proptypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { getFromLS } from '../services/localStorage';
import { db } from '../services/firebase';

export default function EventReview({ members }) {
  const event = getFromLS('event');

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

EventReview.propTypes = {
  members: Proptypes.instanceOf(Object),
  // cloneMusicians: Proptypes.instanceOf(Object),
}.isRequired;
