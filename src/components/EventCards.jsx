import React, { useEffect, useState } from 'react';
import {
  collection, query, getDocs,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db } from '../services/firebase';

export default function EventCards(props) {
  const [events, setEvents] = useState([]);

  const q = query(collection(db, 'events'));

  useEffect(() => async () => {
    const eventArr = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const event = doc.data();

      eventArr.push({ event, id });
    });

    const orderedEvents = eventArr.sort((a, b) => (
      new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
    ));

    setEvents(orderedEvents);
  }, []);

  function translateDate(date, time) {
    const { months } = props;
    const dateSplit = date.split('-');
    const timeSplit = time.split(':');

    const { month } = months[Number(dateSplit[1]) - 1];
    const day = dateSplit[2];
    // -1 because the array starts at 0 // 0 === 'jan'

    const hour = timeSplit[0];
    const min = timeSplit[1];

    return `Dia ${day} de ${month} às ${hour}h${min}min`;
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
          <p>{translateDate(date, time)}</p>
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
          <button type="button">Excluir</button>
        </div>
      )) : <p>Nenhum show marcado</p>}
    </div>
  );
}

EventCards.propTypes = {
  months: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
