import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import { getFromLS } from '../services/localStorage';
import EventCards from '../components/EventCards';
import { months } from '../helpers/data';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { CalendarContext } from '../context/CalendarProvider';
import Footer from '../components/Footer';
import '../style/Calendar.css';
import { EventContext } from '../context/EventProvider';

export default function Calendar() {
  const {
    currMonth,
    setCurrMonth,
  } = useContext(CalendarContext);

  const { setMembers } = useContext(EventContext);

  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => async () => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (!currAccessToken || accessToken !== currAccessToken) navigate('/');
    });

    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
    setLoading(false);
  }, []);

  useEffect(() => setMembers([]), []);

  // function changeMonth({ target: { value } }) {
  //   setCurrMonth(value);
  // }

  return (
    <div>
      {isLoading ? <Loading /> : (

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
      )}
    </div>
  );
}
