import React, { useEffect, useState, useContext } from 'react';
import EventCards from '../components/EventCards';
// import { months } from '../helpers/data';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import '../style/Calendar.css';
import { GlobalContext } from '../context/GlobalProvider';
import UserRoute from '../hooks/axios/routes/UserRoute';

export default function Calendar() {
  const {
    currMonth,
    // setCurrMonth,
  } = useContext(GlobalContext);

  const {
    setUser,
    setMembers,
  } = useContext(GlobalContext);

  const [isLoading, setLoading] = useState(true);

  const route = UserRoute();

  useEffect(() => {
    route.getMe().then(({ status, data }) => {
      if (status === 200) setUser(data);
    });
    setMembers([]);
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
