import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../services/firebase';
import { getFromLS } from '../../services/localStorage';
import { setMonth } from '../../redux/actions';
import EventCards from '../../components/EventCards';
import { months } from '../../helpers/data';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Calendar() {
  const [isLoading, setLoading] = useState(true);
  const [currMonth, setCurrMonth] = useState('');
  const [showActions, setShowActions] = useState(false);

  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(setMonth(currMonth));
  }, [currMonth]);

  function changeMonth({ target: { value } }) {
    setCurrMonth(value);
  }

  return (
    <div>
      {isLoading ? <Loading /> : (

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
          <div>
            <EventCards />
            <button type="button" onClick={() => setShowActions(!showActions)}>+</button>
            {showActions && (
              <>
                <button type="button" onClick={() => navigate('/novo-show')}>Agendar Show</button>
                <button type="button">Shows Realizados</button>
                <button type="button" onClick={() => navigate('/musicos')}>Músicos Cadastrados</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
