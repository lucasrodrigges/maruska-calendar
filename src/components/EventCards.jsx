import React, { useEffect, useState } from 'react';
import {
  collection, query, getDocs, deleteDoc, doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../services/firebase';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { months } from '../helpers/data';

export default function EventCards() {
  const [events, setEvents] = useState([]);
  const [hasClickDel, setOnDelClick] = useState(false);

  const auth = getAuth(app);

  useEffect(() => async () => {
    const q = query(collection(db, 'events'));
    const eventArr = [];
    const querySnapshot = await getDocs(q, auth);

    querySnapshot.forEach((currDoc) => {
      const { id } = currDoc;
      const event = currDoc.data();

      eventArr.push({ event, id });
    });

    const orderedEvents = eventArr.sort((a, b) => (
      new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
    ));

    setEvents(orderedEvents);
  }, [hasClickDel]);

  async function handleDelete({ target: { id } }) {
    await deleteDoc(doc(db, 'events', id));
    setOnDelClick(!hasClickDel);
  }

  return (
    <div>
      <h2>Shows marcados</h2>
      {events.length > 0 ? events.map(({
        id, event: {
          location, date, time, members,
        },
      }) => (
        <div key={id}>
          <h2>{location}</h2>
          <p>{`Dia ${convertDateAndTime(date, time, months)}`}</p>
          <table>
            <thead>
              <tr>
                <td>Integrante</td>
                <td>Instrumento</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(members).map((el) => (
                <tr key={members[el].name}>
                  <td>{members[el].name}</td>
                  <td>{members[el].instrument}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" id={id} onClick={handleDelete}>
            <i className="fa-solid fa-trash" id={id} />
          </button>
          <button type="button">
            <i className="fa-solid fa-check-to-slot" />
          </button>
        </div>
      )) : <p>Nenhum show marcado</p>}
    </div>
  );
}
