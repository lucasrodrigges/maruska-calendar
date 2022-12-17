import React, { useEffect, useState, useContext } from 'react';
import EventCards from '../components/EventCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { GlobalContext } from '../context/GlobalProvider';
import { getMe } from '../api/routes/userRoute';

import '../style/Calendar.css';
import { getEvents } from '../api/routes/eventRoute';

export default function Calendar() {
  const {
    currMonth,
    setEvents,
    // setCurrMonth,
  } = useContext(GlobalContext);

  const {
    setUser,
    setMembers,
    setCurrEvent,
  } = useContext(GlobalContext);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then(({ status, data }) => {
      if (status === 200) setUser(data);
    });
    setCurrEvent({
      title: '',
      date: '',
      time: '',
    });
    setMembers([]);
    setLoading(!isLoading);
  }, []);

  useEffect(() => {
    getEvents().then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return isLoading ? <Loading /> : (
    <div>
      <Header currMonth={currMonth} />
      <div className="event-cards-container">
        <EventCards />
      </div>
      <Footer />
    </div>
  );
}
