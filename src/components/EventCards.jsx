import React, { useEffect, useState } from 'react';
import {
  collection, query, getDocs,
} from 'firebase/firestore';
import { db } from '../services/firebase';

export default function EventCards() {
  const [events, setEvents] = useState([]);

  const q = query(collection(db, 'events'));

  useEffect(() => async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const event = doc.data();
      setEvents([...events, { event, id }]);
    });
  }, []);

  return (
    <div>
      {events.length > 0 ? events.map(({
        id, event: {
          name, date, time, members,
        },
      }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{date}</p>
          <p>{time}</p>
          <table>
            <thead>
              <tr>
                <td>Integrante</td>
                <td>Instrumento</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(members).map((el) => (
                <tr>
                  <td>{members[el].name}</td>
                  <td>{members[el].instrument}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )) : <p>Nenhum show marcado</p>}
    </div>
  );
}
