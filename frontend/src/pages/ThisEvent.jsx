import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertConfirm from '../components/AlertConfirm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import createDate from '../helpers/createDate';
import EventRoute from '../hooks/axios/routes/EventRoute';
import '../style/Calendar.css';

export default function ThisEvent() {
  const { user: { isAdmin } } = useContext(GlobalContext);

  const [thisEvent, setThisEvent] = useState({
    id: '',
    title: '',
    when: '',
    description: '',
    musicians: [],
  });
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const route = EventRoute();

  useEffect(() => {
    const path = location.pathname;
    const id = path.split('/')[2];

    route.getEventById(id).then(({ status, data }) => {
      if (status === 200) setThisEvent(data);
      else alert('Algo de errado aconteceu.');
    });
  }, []);

  const handleDelete = () => {
    route.deleteEvent(thisEvent.id).then(({ status }) => {
      if (status === 204) navigate(-1);
      else alert('Não foi possível exluir o evento, tente novamente mais tarde.');
    });
  };

  return (
    <div>
      <Header />
      {thisEvent.id && (
        <div className="this-event">
          <div className="event-container">
            <h2 className="event-title">{thisEvent.title}</h2>
            <p className="event-items">{`Data: ${createDate(thisEvent.when)}`}</p>
            <p className="event-items">Banda:</p>
            <ul className="ul-band">
              {thisEvent.musicians.map((el) => (
                <div key={el.id}>
                  <li className="ul-item">{el.name}</li>
                </div>
              ))}
            </ul>
            {thisEvent.description && (
            <span className="event-description">{`Observação: ${thisEvent.description}`}</span>
            )}
            {isAdmin && (
              <div className="event-buttons-container">
                <button className="del-button-event " type="button">
                  <i className="fa-regular fa-pen-to-square" />
                </button>
                <button
                  className="del-button-event"
                  type="button"
                  id={thisEvent.id}
                  onClick={() => setShowAlert(!showAlert)}
                >
                  <i className="fa-solid fa-trash" id={thisEvent.id} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}
      {showAlert && <AlertConfirm func={handleDelete} setShowAlert={setShowAlert} />}
      <Footer />
    </div>
  );
}
