import React, { useEffect, useState, useContext } from 'react';
import EventCards from '../components/EventCards';
import { months } from '../helpers/data';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { CalendarContext } from '../context/CalendarProvider';
import Footer from '../components/Footer';
import '../style/Calendar.css';
import { EventContext } from '../context/EventProvider';
import useLogin from '../hooks/useLogin';

export default function Calendar() {
  const {
    currMonth,
    setCurrMonth,
  } = useContext(CalendarContext);

  const {
    setMembers,
    toUpdate,
    setUpdate,
  } = useContext(EventContext);

  const [isLoading, setLoading] = useState(true);

  const isLogged = useLogin();

  useEffect(() => isLogged && setLoading(false), [isLogged]);

  useEffect(() => {
    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
    setMembers([]);
    setUpdate(!toUpdate);
  }, []);

  // function changeMonth({ target: { value } }) {
  //   setCurrMonth(value);
  // }

  return isLoading ? <Loading /> : (
    <div>
      <Header currMonth={currMonth} />
      {/* <label htmlFor="month">
            Meses:
            <select name="currMonth" id="month" value={currMonth} onChange={changeMonth}>
              {months.map(({ name, month }) => (
                <option key={name} value={month}>{month}</option>
              ))}
            </select>
          </label> */}
      <div className="event-cards-container">
        <EventCards />
      </div>
      <Footer />
    </div>
  );
}
