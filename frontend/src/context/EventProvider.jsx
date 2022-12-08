import React, {
  createContext, useState, useMemo, useEffect,
} from 'react';
import {
  collection, query, getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import PropTypes from 'prop-types';
import { app, db } from '../services/firebase';

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [currEvent, setCurrEvent] = useState({
    location: '',
    date: '',
    time: '',
    description: '',
  });
  const [members, setMembers] = useState([]);
  const [toUpdate, setUpdate] = useState(false);

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

        const orderedEvents = eventArr
          .sort(({
            event: {
              date: dateA,
              time: timeA,
            },
          }, {
            event: {
              date: dateB,
              time: timeB,
            },
          }) => {
            if (dateA === dateB) {
              return +timeA.split(':').join('') - +timeB.split(':').join('');
            }
            return +dateA.split('-').join('') - +dateB.split('-').join('');
          });
        setEvents([...orderedEvents]);
      });
  }, [toUpdate]);

  const context = useMemo(() => ({
    currEvent,
    setCurrEvent,
    members,
    setMembers,
    toUpdate,
    setUpdate,
    events,
    setEvents,
  }));

  return (
    <EventContext.Provider value={context}>
      {children}
    </EventContext.Provider>
  );
}

EventProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
