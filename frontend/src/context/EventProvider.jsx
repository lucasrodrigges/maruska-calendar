import React, {
  createContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
// import UseAxios from '../hooks/UseAxios';

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [currEvent, setCurrEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });
  const [members, setMembers] = useState([]);
  const [toUpdate, setUpdate] = useState(false);

  // const axios = UseAxios();

  // useEffect(() => {
  //   axios.get('/event')
  //     .then(({ data }) => setEvents(data))
  //     .catch((err) => console.error('ERROR => ', err));
  // }, [toUpdate]);

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
