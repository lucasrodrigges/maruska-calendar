import React, { useEffect, useState, useContext } from 'react';
import EventCards from '../components/EventCards';
// import { months } from '../helpers/data';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { CalendarContext } from '../context/CalendarProvider';
import Footer from '../components/Footer';
import '../style/Calendar.css';
import { EventContext } from '../context/EventProvider';

export default function Calendar() {
  const {
    currMonth,
    // setCurrMonth,
  } = useContext(CalendarContext);

  const {
    setMembers,
    toUpdate,
    setUpdate,
  } = useContext(EventContext);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // const date = new Date();

    // setCurrMonth(months[date.getMonth()].month);
    setMembers([]);
    setUpdate(!toUpdate);
    setLoading(!isLoading);
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
