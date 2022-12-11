import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import EventRouter from '../hooks/axios/routes/EventRouter';
import '../style/Calendar.css';

export default function EventReview() {
  const { currEvent, members } = useContext(GlobalContext);

  const navigate = useNavigate();
  const route = EventRouter();

  function handleConfirm(e) {
    e.preventDefault();

    const musicianIds = members.reduce((acc, el) => [Number(el.id), ...acc], []);
    const when = `${currEvent.date} ${currEvent.time}`;
    const { title, description } = currEvent;

    const eventToSubmit = {
      title,
      description,
      when,
      musicianIds,
    };

    route.createEvent(eventToSubmit).then(({ status }) => {
      if (status === 201) navigate('/calendario');
      else alert('Não foi possível cadastrar evento, tente novamente');
    });
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
