import React, { useEffect, useState } from 'react';
import {
  collection, query, getDocs, deleteDoc, doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../services/firebase';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { months } from '../helpers/data';
import sadUnicorny from '../images/sadUnicorny.png';

export default function EventCards() {
  const [events, setEvents] = useState([]);
  const [hasClickDel, setOnDelClick] = useState(false);

  const auth = getAuth(app);
  const q = query(collection(db, 'events'));

  useEffect(() => {
    const eventArr = [];
    getDocs(q, auth)
      .then((querySnapshot) => {
        querySnapshot.forEach((currDoc) => {
          const { id } = currDoc;
          const event = currDoc.data();

          eventArr.push({ event, id });
        });
        setEvents(eventArr);
      });
  }, [hasClickDel]);

  useEffect(() => {
    const orderedEvents = events
      .sort(({ event: { date: dateA, time: timeA } }, { event: { date: dateB, time: timeB } }) => {
        if (dateA === dateB) {
          return +timeA.split(':').join('') - +timeB.split(':').join('');
        }
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      });

    setEvents(orderedEvents);
  }, [events]);

  async function handleDelete({ target: { id } }) {
    await deleteDoc(doc(db, 'events', id));
    setOnDelClick(!hasClickDel);
  }

  return (
    <div>
      {/* <div>
        <h2 className="event-cards-title">Shows agendados</h2>
      </div> */}
      {events.length > 0 ? events.map(({
        id, event: {
          location, date, time, members,
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
