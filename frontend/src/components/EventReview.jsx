import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, updateEvent } from '../api/routes/eventRoute';
import { GlobalContext } from '../context/GlobalProvider';
import '../style/Calendar.css';

export default function EventReview() {
  const {
    currEvent, members, idToEdit, setIdToEdit,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  function handleConfirm(e) {
    e.preventDefault();

    const musicianIds = members.reduce((acc, el) => [Number(el.id), ...acc], []);
    const when = new Date(`${currEvent.date} ${currEvent.time}`).toUTCString(); // VALEU WAN
    const { title, description } = currEvent;

    const eventToSubmit = {
      title,
      description: description || '',
      when,
      musicianIds,
    };

    if (!idToEdit) {
      createEvent(eventToSubmit).then(({ status }) => {
        if (status === 201) navigate('/calendario');
        else alert('Não foi possível cadastrar evento, tente novamente');
      });
    } else {
      updateEvent(idToEdit, eventToSubmit).then(({ status }) => {
        if (status === 200) {
          setIdToEdit('');
          navigate(`/evento/${idToEdit}`);
        } else alert('Não foi possível cadastrar evento, tente novamente');
      });
    }
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
