import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { GlobalContext } from '../context/GlobalProvider';
import createDate from '../helpers/createDate';
import EventRouter from '../hooks/axios/routes/EventRouter';
import '../style/Dashboard.css';

export default function AdminDashboard() {
  const {
    events,
    setEvents,
  } = useContext(GlobalContext);

  const [isLoaging, setLoading] = useState(true);

  const navigate = useNavigate();
  const route = EventRouter();

  useEffect(() => events && setLoading(false), [events]);

  useEffect(() => {
    if (events.length === 0) {
      route.getEvents().then(({ status, data }) => {
        if (status === 200) setEvents(data);
      });
    }
  }, []);

  function handleDelete({ target: { id } }) {
    route.deleteEvent(id).then(({ status }) => {
      if (status === 204) navigate('/calendario');
      else alert('Desculpe, não foi possível excluir o evento. Atualize a página e tente novamente!');
    });
  }

  return isLoaging ? <Loading /> : (
    <div>
      <Header />
      <div className="dashboard-container">
        {events.length > 0 && (
          events.map(({
            id, title, when,
          }) => (
            <div className="event-container" key={id}>
              <p>{`${title} (${createDate(when)})`}</p>
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
