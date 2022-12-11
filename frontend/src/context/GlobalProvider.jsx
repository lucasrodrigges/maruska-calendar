import React, {
  createContext, useState, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getFromLS } from '../services/localStorage';
import { months } from '../helpers/data';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [user, setUser] = useState({});
  const [userEdit, setUserEdit] = useState({});
  const [userToken, setUserToken] = useState('');
  const [musicians, setMusicians] = useState([]);
  const [events, setEvents] = useState([]);
  const [currEvent, setCurrEvent] = useState({
    title: '',
    date: '',
    time: '',
  });
  const [members, setMembers] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [currMonth, setCurrMonth] = useState('');

  useEffect(() => {
    const index = new Date().getMonth();
    const month = Object.values(months)[index];

    setCurrMonth(month);
  }, []);

  const state = useMemo(() => ({
    musicians,
    setMusicians,
    events,
    setEvents,
    currEvent,
    setCurrEvent,
    members,
    setMembers,
    showActions,
    setShowActions,
    user,
    setUser,
    userEdit,
    setUserEdit,
    userToken,
    setUserToken,
    currMonth,
    setCurrMonth,
  }));

  useEffect(() => {
    setUserToken(getFromLS('token'));
  }, [getFromLS('token')]);

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.instanceOf(Object),
}.isRequired;
