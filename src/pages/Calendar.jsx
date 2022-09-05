import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import setToLS, { getFromLS } from '../services/localStorage';
import CalendarCards from '../components/CalendarCards';
import './Calendar.css';

export default function Calendar() {
  const [isLogged, setIsLogged] = useState(false);

  const auth = getAuth(app);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, ({ uid }) => {
      const id = getFromLS('session').userId;

      if (id === uid) setIsLogged(true);
      else setIsLogged(false);
    });
  }, []);

  function handleLogout() {
    setToLS('session', { userId: '' });
    navigate('/');
  }

  return (
    <div>
      {!isLogged ? (
        <div>
          <p>Usuário não logado</p>
        </div>
      ) : (
        <div>
          <button type="button" onClick={handleLogout}>Sair</button>
          <CalendarCards />
        </div>
      )}
    </div>
  );
}
