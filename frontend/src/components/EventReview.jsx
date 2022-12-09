import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventProvider';
import UseAxios from '../hooks/UseAxios';
import '../style/Calendar.css';

export default function EventReview() {
  const { currEvent, members } = useContext(EventContext);

  const navigate = useNavigate();
  const axios = UseAxios();

  function handleConfirm(e) {
    e.preventDefault();

    const musicianIds = members.reduce((acc, el) => [el.id, ...acc], []);
    const when = `${currEvent.date} ${currEvent.time}`;
    const { title, description } = currEvent;

    const eventToSubmit = {
      title,
      description,
      when,
      musicianIds,
    };

    axios.post('/event', eventToSubmit)
      .then(() => navigate('/calendario'))
      .catch((err) => console.error('ERROR => ', err));
  }

  return (
    <div className="event-review">
      <h3 className="event-title">{currEvent.location}</h3>
      {/* <p className="event-items">{createDate}</p> */}
      <p className="event-items">Banda:</p>
      <ul className="ul-band">
        {members.map(({ name }) => (
          <li className="ul-item" key={name}>{name}</li>
        ))}
      </ul>
      {currEvent.description && (
      <span className="event-description">{`Observação: ${currEvent.description}`}</span>
      )}
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
