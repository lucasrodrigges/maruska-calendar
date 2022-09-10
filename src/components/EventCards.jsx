import React, { useEffect, useState } from 'react';
import {
  collection, query, getDocs, deleteDoc, doc,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { months } from '../helpers/data';

export default function EventCards() {
  const [events, setEvents] = useState([]);
  const [hasClickDel, setOnDelClick] = useState(false);

  const q = query(collection(db, 'events'));

  useEffect(() => async () => {
    const eventArr = [];
    const querySnapshot = await getDocs(q);

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
    setOnDelClick(!hasClickDel); // forces useEffect runs
  }

  return (
    <div>
      <h2>Shows marcados</h2>
      {events.length > 0 ? events.map(({
        id, event: {
          name, date, time, members,
        },
      }) => (
        <div key={id}>
          <h2>{name}</h2>
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
          <button type="button" id={id} onClick={handleDelete}>Excluir</button>
        </div>
      )) : <p>Nenhum show marcado</p>}
    </div>
  );
}
