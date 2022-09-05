import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setToLS from '../services/localStorage';

export default function EventForm() {
  const [showBandForm, setShowBandForm] = useState(false);
  const [event, setEvent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setToLS('event', {});
  }, []);

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
          <input name="eventName" id="eventName" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="eventDate">
          Data:
          <input type="date" name="eventDate" id="eventDate" onChange={handleChange} />
        </label>
        <label htmlFor="eventTime">
          Hora:
          <input type="time" name="eventTime" id="eventTime" onChange={handleChange} />
        </label>
        <button type="submit">Marcar show</button>
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
