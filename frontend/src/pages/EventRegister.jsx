import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EventContext } from '../context/EventProvider';
import '../style/EventRegister.css';

export default function EventRegister() {
  const {
    currEvent,
    setCurrEvent,
  } = useContext(EventContext);

  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { title, date, time } = currEvent;

    if ([title, date, time].every((el) => el.length)) {
      setDisabled(false);
    } else setDisabled(true);
  }, [currEvent]);

  function handleChange({ target: { name, value } }) {
    setCurrEvent({
      ...currEvent,
      [name]: value,
    });
  }

  return (
    <div>
      <Header />
      <div className="event-register-container">
        <h2 className="event-register-title">Detalhes do evento</h2>
        <form
          className="event-form"
          action="form"
          onSubmit={() => navigate('/banda')}
        >
          <input
            className="input-1"
            name="title"
            id="eventLocation"
            type="text"
            placeholder="Nome do bar ou evento"
            onChange={handleChange}
          />
          <input
            className="input-1"
            type="date"
            name="date"
            id="eventDate"
            onChange={handleChange}
          />
          <input
            className="input-1"
            type="time"
            name="time"
            id="eventTime"
            onChange={handleChange}
          />
          <textarea
            className="text-area-1"
            name="description"
            id="description"
            cols="30"
            rows="8"
            placeholder="Observações (opcional)"
            onChange={handleChange}
          />
          <button
            className="button-1"
            type="submit"
            disabled={isDisabled}
          >
            Continuar

          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
