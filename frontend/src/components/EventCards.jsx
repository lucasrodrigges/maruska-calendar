import React, { useContext } from 'react';

import sadUnicorny from '../images/sadUnicorny.png';
import { EventContext } from '../context/EventProvider';
import createDate from '../helpers/createDate';

export default function EventCards() {
  const {
    events,
  } = useContext(EventContext);

  return (
    <div className="calendar-general-container">

      {events.length > 0 ? events.map(({
        id, title, musicians, description, when,
      }) => (
        <div key={id} className="event-container">
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

        </div>
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
