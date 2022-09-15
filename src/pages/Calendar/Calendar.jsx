import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../services/firebase';
import { getFromLS } from '../../services/localStorage';
import './Calendar.css';
import { setMonth } from '../../redux/actions';
import EventForm from '../../components/EventForm';
import EventCards from '../../components/EventCards';
import { months } from '../../helpers/data';
import Header from '../../components/Header';

export default function Calendar() {
  const [isLogged, setIsLogged] = useState(false);

  const [currMonth, setCurrMonth] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken === currAccessToken) setIsLogged(true);
      else navigate('/');
    });
  }, []);

  useEffect(() => {
    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
  }, []);

  useEffect(() => {
    dispatch(setMonth(currMonth));
  }, [currMonth]);

  function changeMonth({ target: { value } }) {
    setCurrMonth(value);
  }

  return (
    <div>
      <Header />
      <label htmlFor="month">
        Meses:
        <select name="currMonth" id="month" value={currMonth} onChange={changeMonth}>
          {months.map(({ name, month }) => (
            <option key={name} value={month}>{month}</option>
          ))}
        </select>
      </label>
      {!isLogged ? (
        <div>
          <p>Usuário não logado</p>
        </div>
      ) : (
        <div>
          <EventForm />
          <EventCards />
        </div>
      )}
    </div>
  );
}
