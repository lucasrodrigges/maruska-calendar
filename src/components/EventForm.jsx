import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setToLS from '../services/localStorage';

export default function EventForm() {
  const [event, setEvent] = useState({
    location: '',
    date: '',
    time: '',
  });
  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { location, date, time } = event;

    if ([location, date, time].every((el) => el.length)) {
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
    setToLS('event', event);
    navigate('/banda');
  }

  return (
    <div>
      <h2>Marcar evento</h2>
      <form action="form" onSubmit={handleSubmit}>
        <label htmlFor="eventLocation">
          Onde:
          <input name="location" id="eventLocation" type="text" onChange={handleChange} />
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
    </div>
  );
}
