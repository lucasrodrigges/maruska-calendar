import React, { useContext, useEffect, useState } from 'react';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { months } from '../helpers/data';
import sadUnicorny from '../images/sadUnicorny.png';
import { EventContext } from '../context/EventProvider';

export default function EventCards() {
  const {
    events,
  } = useContext(EventContext);

  const [eventsClone, setEventsClone] = useState([]);

  useEffect(() => {
    const orderedEvents = events
      .sort(({ event: { date: dateA, time: timeA } }, { event: { date: dateB, time: timeB } }) => {
        if (dateA === dateB) {
          return +timeA.split(':').join('') - +timeB.split(':').join('');
        }
        return +dateA.split('-').join('') - +dateB.split('-').join('');
      });

    setEventsClone([...orderedEvents]);
  }, [events]);

  return (
    <div className="calendar-general-container">
      {/* <div>
        <h2 className="event-cards-title">Shows agendados</h2>
      </div> */}
      {eventsClone.length > 0 ? eventsClone.map(({
        id, event: {
          location, date, time, members, description,
        },
      }) => (
        <div key={id} className="event-container">
          <h2 className="event-title">{location}</h2>
          <p className="event-items">{`Data: ${convertDateAndTime(date, time, months)}`}</p>
          <p className="event-items">Banda:</p>
          <ul className="ul-band">
            {Object.keys(members).map((el) => (
              <div key={members.name}>
                <li className="ul-item">{members[el].name}</li>
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
