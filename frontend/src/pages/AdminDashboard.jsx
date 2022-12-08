import { deleteDoc, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { EventContext } from '../context/EventProvider';
import { UserContext } from '../context/UserProvider';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { ADMIN_UID_ARR } from '../helpers/data';
import { db } from '../services/firebase';
import '../style/Dashboard.css';

export default function AdminDashboard() {
  const { UID } = useContext(UserContext);
  const {
    events,
    setEvents,
  } = useContext(EventContext);

  const [isLoaging, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = ADMIN_UID_ARR.includes(UID);

    if (!isAdmin) navigate('/calendario');
  }, []);

  useEffect(() => events && setLoading(false), [events]);

  function handleDelete({ target: { id } }) {
    deleteDoc(doc(db, 'events', id))
      .then(() => {
        setEvents(events.filter((el) => el.id !== id));
      });
  }

  return isLoaging ? <Loading /> : (
    <div>
      <Header />
      <div className="dashboard-container">
        {events.length > 0 && (
          events.map(({ id, event: { location, date, time } }) => (
            <div className="event-container" key={id}>
              <p>{`${location} (${convertDateAndTime(date, time)})`}</p>
              <div className="event-buttons-container">
                <button className="del-button-event " type="button">
                  <i className="fa-regular fa-pen-to-square" />
                </button>
                <button
                  className="del-button-event"
                  type="button"
                  id={id}
                  onClick={handleDelete}
                >
                  <i className="fa-solid fa-trash" id={id} />
                </button>
              </div>
            </div>
          ))
        ) }
      </div>
      <Footer />
    </div>
  );
}
