import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [event, setEvent] = useState({
    location: '',
    date: '',
    time: '',
    description: '',
  });
  const [members, setMembers] = useState([]);

  const context = useMemo(() => ({
    event,
    setEvent,
    members,
    setMembers,
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
