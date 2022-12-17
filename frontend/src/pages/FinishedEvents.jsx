import React, { useEffect, useContext } from 'react';
import { getFinishedEvents } from '../api/routes/eventRoute';
import EventCards from '../components/EventCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';

export default function FinishedEvents() {
  const {
    setEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    getFinishedEvents().then(({ data }) => setEvents(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="event-cards-container">
        <EventCards />
      </div>
      <Footer />
    </div>
  );
}
