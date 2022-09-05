import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../services/firebase';
import { getFromLS } from '../services/localStorage';
import './Calendar.css';
import Header from '../components/Header';
import { setMonth } from '../redux/actions';
import EventForm from '../components/EventForm';
import EventCards from '../components/EventCards';

export default function Calendar() {
  const [isLogged, setIsLogged] = useState(false);
  const months = [
    { name: 'Jan', month: 'Janeiro' },
    { name: 'Feb', month: 'Fevereiro' },
    { name: 'Mar', month: 'Março' },
    { name: 'Apr', month: 'Abril' },
    { name: 'May', month: 'Maio' },
    { name: 'June', month: 'Junho' },
    { name: 'July', month: 'Julho' },
    { name: 'Aug', month: 'Agosto' },
    { name: 'Sept', month: 'Setembro' },
    { name: 'Oct', month: 'Outubro' },
    { name: 'Nov', month: 'Novembro' },
    { name: 'Dec', month: 'Dezembro' },
  ];
  // const weekDays = [
  //   { name: 'Sun', day: 'Domingo' },
  //   { name: 'Mon', day: 'Segunda' },
  //   { name: 'Tue', day: 'Terça' },
  //   { name: 'Wed', day: 'Quarta' },
  //   { name: 'Thu', day: 'Quinta' },
  //   { name: 'Fri', day: 'Sexta' },
  //   { name: 'Sat', day: 'Sábado' },
  // ];

  const [currMonth, setCurrMonth] = useState('');
  // const [currDay, setCurrDay] = useState('');

  const dispatch = useDispatch();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ uid }) => {
      const id = getFromLS('session').userId;

      if (id === uid) setIsLogged(true);
      else setIsLogged(false);
    });
  }, []);

  useEffect(() => {
    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
    // setCurrDay(weekDays[date.getDay()].day);
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
