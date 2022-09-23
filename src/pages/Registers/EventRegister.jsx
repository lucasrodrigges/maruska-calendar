import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { EventContext } from '../../context/EventProvider';
import { app } from '../../services/firebase';
import { getFromLS } from '../../services/localStorage';

export default function EventRegister() {
  const {
    event,
    setEvent,
  } = useContext(EventContext);

  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken !== currAccessToken) navigate('/');
    });

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

  return (
    <div>
      <Header />
      <h2>Marcar evento</h2>
      <form action="form" onSubmit={() => navigate('/banda')}>
        <label htmlFor="eventLocation">
          Local:
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
        <label htmlFor="description">
          Descrição (opcional):
          <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} />
        </label>
        <button type="button" onClick={() => navigate(-1)}>Voltar</button>
        <button type="submit" disabled={isDisabled}>Continuar</button>
      </form>
    </div>
  );
}
