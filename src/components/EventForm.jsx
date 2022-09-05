import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setToLS from '../services/localStorage';

export default function EventForm() {
  const [showBandForm, setShowBandForm] = useState(false);
  const [event, setEvent] = useState({
    name: '',
    date: '',
    time: '',
  });
  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { name, date, time } = event;

    if ([name, date, time].every((el) => el.length)) {
      setDisabled(false);
    } else setDisabled(true);
  }, [event]);

  function handleChange({ target: { name, value } }) {
    setEvent({
      ...event,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowBandForm(true);
  }

  function createEvent() {}

  return (
    <div>
      <form action="form" onSubmit={handleSubmit}>
        <label htmlFor="eventName">
          Nome:
          <input name="name" id="eventName" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="eventDate">
          Data:
          <input type="date" name="date" id="eventDate" onChange={handleChange} />
        </label>
        <label htmlFor="eventTime">
          Hora:
          <input type="time" name="time" id="eventTime" onChange={handleChange} />
        </label>
        <button type="submit" disabled={isDisabled}>Marcar show</button>
      </form>
      {showBandForm && (
      <form>
        É com banda?
        <button type="button" onClick={createEvent}>Não</button>
        <button
          type="button"
          onClick={() => {
            navigate('/banda');
            setToLS('event', { ...event, hasBand: true });
          }}
        >
          Sim
        </button>
      </form>
      )}
    </div>
  );
}
