import { deleteDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EventContext } from '../context/EventProvider';
import convertDateAndTime from '../helpers/convertDateAndTime';
import { db } from '../services/firebase';

export default function AdminDashboard() {
  const {
    events,
    setEvents,
  } = useContext(EventContext);

  function handleDelete({ target: { id } }) {
    deleteDoc(doc(db, 'events', id))
      .then(() => {
        setEvents(events.filter((el) => el.id !== id));
      });
  }

  return (
    <div>
      <Header />
      {events.length > 0 && (
        events.map(({ id, event: { location, date, time } }) => (
          <div>
            <p>{`${location} (${convertDateAndTime(date, time)})`}</p>
            <button
              className="del-button-event"
              type="button"
              id={id}
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash" id={id} />
            </button>
          </div>
        ))
      ) }
      <Footer />
    </div>
  );
}
