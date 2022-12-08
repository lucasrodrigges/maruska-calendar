<<<<<<< HEAD
import React, { useContext } from 'react';
=======
import React, { useContext, useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
>>>>>>> d75a555f2ffbad5e01158869670d37113898eb12
import convertDateAndTime from '../helpers/convertDateAndTime';
import { months } from '../helpers/data';
import sadUnicorny from '../images/sadUnicorny.png';
import { EventContext } from '../context/EventProvider';

export default function EventCards() {
  const {
<<<<<<< HEAD
    events,
  } = useContext(EventContext);

  return (
    <div className="calendar-general-container">

      {events.length > 0 ? events.map(({
=======
    toUpdate,
    setUpdate,
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

  async function handleDelete({ target: { id } }) {
    await deleteDoc(doc(db, 'events', id));
    setUpdate(!toUpdate);
  }

  return (
    <div className="calendar-general-container">
      {/* <div>
        <h2 className="event-cards-title">Shows agendados</h2>
      </div> */}
      {eventsClone.length > 0 ? eventsClone.map(({
>>>>>>> d75a555f2ffbad5e01158869670d37113898eb12
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
<<<<<<< HEAD
              <div key={members[el].name}>
=======
              <div key={members.name}>
>>>>>>> d75a555f2ffbad5e01158869670d37113898eb12
                <li className="ul-item">{members[el].name}</li>
              </div>
            ))}
          </ul>
          {description && (
            <span className="event-description">{`Observação: ${description}`}</span>
          )}
<<<<<<< HEAD
=======
          <div className="event-buttons-container">
            {/* <button className="del-button-event " type="button">
              <i className="fa-solid fa-check-to-slot" />
            </button> */}
            <button
              className="del-button-event"
              type="button"
              id={id}
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash" id={id} />
            </button>
          </div>
>>>>>>> d75a555f2ffbad5e01158869670d37113898eb12
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
