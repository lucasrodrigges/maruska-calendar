import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import sadUnicorny from '../images/sadUnicorny.png';
import createDate from '../helpers/createDate';
import { GlobalContext } from '../context/GlobalProvider';
import EventRouter from '../hooks/axios/routes/EventRoute';

export default function EventCards() {
  const {
    events,
    setEvents,
  } = useContext(GlobalContext);

  const route = EventRouter();

  useEffect(() => {
    route.getEvents().then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return (
    <div className="calendar-general-container">

      {events.length > 0 ? events.map(({
        id, title, musicians, description, when,
      }) => (
        <Link to={`/evento/${id}`} key={id} className="event-container">
          <h2 className="event-title">{title}</h2>
          <p className="event-items">{`Data: ${createDate(when)}`}</p>
          <p className="event-items">Banda:</p>
          <ul className="ul-band">
            {musicians.map((el) => (
              <div key={el.id}>
                <li className="ul-item">{el.name}</li>
              </div>
            ))}
          </ul>
          {description && (
            <span className="event-description">{`Observação: ${description}`}</span>
          )}

        </Link>
      )) : (
        <div>
          <img
            src={sadUnicorny}
            alt="Unicónio Triste"
            width="300px"
          />
          <h2 className="nothing-here">Nenhum show agendado ;(</h2>
        </div>
      )}
    </div>
  );
}
