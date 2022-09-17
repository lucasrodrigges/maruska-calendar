import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { app, db } from '../services/firebase';
import setToLS, { getFromLS } from '../services/localStorage';
// import sendWppMessage from '../services/wppBot';
import convertDateAndTime from '../helpers/convertDateAndTime';

export default function EventReview(props) {
  const { members, musicians } = props;
  const [event, setEvent] = useState('');
  const { location, date, time } = event;

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    const currEvent = getFromLS('event');
    setEvent(currEvent);
  }, []);

  async function handleAddEvent() {
    const musiciansArr = [];

    members.forEach(async (member) => {
      const newMember = musicians.find(({ name }) => name === member);
      // const { phoneNum } = newMember;

      musiciansArr.push(newMember);
      // if (phoneNum) {
      //   const msgObj = {
      //     phoneNum, musician: member, date: convertDateAndTime(date, time), location,
      //   };

      //   await sendWppMessage(msgObj);
      // }
      // TODO UNCOMMENT JUST IN DEPLOY PRODUCTION
      navigate('calendario');
    });

    await addDoc(collection(db, 'events'), { ...event, members: musiciansArr }, auth);
    setToLS('event', { ...event, musiciansArr });
    navigate('calendario');
  }
  return (
    <div>
      <h3>{location}</h3>
      {date && <p>{`Data e Hora: ${convertDateAndTime(date, time)}` }</p>}
      <p>Banda:</p>
      <ul>
        {members.map((member) => (
          <li>{member}</li>
        ))}
      </ul>
      <button type="button" onClick={() => navigate('novo-show')}>Editar</button>
      <button type="button" onClick={handleAddEvent}>Confirmar</button>
    </div>
  );
}

EventReview.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  musicians: PropTypes.instanceOf(Object).isRequired,
};
