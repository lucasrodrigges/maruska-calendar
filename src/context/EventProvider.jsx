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
        setEvents(eventArr);
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
