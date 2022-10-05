import React, { useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { db } from '../services/firebase';
import { EventContext } from '../context/EventProvider';
import '../style/Calendar.css';

export default function EventReview() {
  const { currEvent, members } = useContext(EventContext);

  const navigate = useNavigate();

  function handleConfirm() {
    const eventToSubmit = {
      ...currEvent,
      members,
    };

    addDoc(collection(db, 'events'), eventToSubmit)
      .then(() => navigate('/calendario'));
  }

  return (
    <div className="event-review">
      <h3 className="event-title">{currEvent.location}</h3>
      <p className="event-items">{convertDateAndTime(currEvent.date, currEvent.time)}</p>
      <p className="event-items">Banda:</p>
      <ul className="ul-band">
        {members.map(({ name }) => (
          <li className="ul-item" key={name}>{name}</li>
        ))}
      </ul>
      <div className="event-review-buttons">
        <button
          className="button-3"
          type="button"
          onClick={() => navigate(-1)}
        >
          Editar
        </button>
        <button
          className="button-3"
          type="button"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
